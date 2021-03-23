import { promises as fs } from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import gitWrapper from '@/apiUtils/gitWrapper';
import { formatTreeData, formatCommitData, sortObjects } from '@/apiUtils/jsonFormatter';
import { ObjectData } from '@/store/types';

const getRepository = (req: NextApiRequest, res: NextApiResponse) => {
    const pathToRepos = process.env.DIR;
    const { repoID, branch, pathSlug } = req.query;
    const pathToRepo = path.join(pathToRepos, repoID as string);
    const pathArg = pathSlug ? `${branch}:${(pathSlug as string[]).join('/')}` : `${branch}`;

    fs.access(pathToRepo)
        .then(async () => {
            const treeContent = formatTreeData(await gitWrapper(['ls-tree', pathArg], pathToRepo));
            const fullContent = await Promise.all(
                treeContent.map(async (item) => {
                    const newPath = pathSlug ? path.join(...pathSlug, item.name) : item.name;
                    const fullOut = await gitWrapper(
                        [
                            'log',
                            '-1',
                            '--format=%h%n%s%n%an%n%ar%n%ad',
                            '--date=format:%d %b %Y, %H:%M',
                            `${branch}`,
                            '--',
                            newPath,
                        ],
                        pathToRepo
                    );

                    return {
                        ...item,
                        ...formatCommitData(fullOut),
                    };
                })
            );

            res.status(200).json(sortObjects(fullContent as ObjectData[]));
        })
        .catch((err: Error) => res.status(404).send(err.message));
};

export default getRepository;
