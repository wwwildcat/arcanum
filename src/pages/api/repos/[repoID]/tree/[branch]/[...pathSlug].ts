import { promises as fs } from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import gitWrapper from '../../../../utils/gitWrapper';
import { formatTreeData, formatCommitData, sortObjects } from '../../../../utils/jsonFormatter';
import { ObjectData } from '../../../../../../store/types';

const getRepository = (req: Request, res: Response) => {
    const pathToRepos = process.env.DIR;
    const { repoID, branch, pathSlug } = req.query;
    const pathToRepo = path.join(pathToRepos, repoID as string);
    const pathToDir = (pathSlug as string[]).join('/');
    const fullPath = path.join(pathToRepo, pathToDir);

    fs.access(fullPath)
        .then(async () => {
            const treeContent = formatTreeData(
                await gitWrapper(['ls-tree', `${branch}:${pathToDir}`], pathToRepo)
            );
            const fullContent = await Promise.all(
                treeContent.map(async (item) => {
                    const fullOut = await gitWrapper(
                        [
                            'log',
                            '-1',
                            '--format=%h%n%s%n%an%n%ar%n%ad',
                            `${branch}`,
                            '--',
                            item.name,
                        ],
                        fullPath
                    );

                    return {
                        ...item,
                        ...formatCommitData(fullOut),
                    };
                })
            );

            res.json(sortObjects(fullContent as ObjectData[]));
        })
        .catch((err: Error) => res.status(404).send(err.message));
};

export default getRepository;
