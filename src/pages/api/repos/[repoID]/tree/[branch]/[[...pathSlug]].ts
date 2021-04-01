import { access } from 'fs/promises';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import gitWrapper from '@/apiUtils/gitWrapper';
import { formatTreeData, formatCommitData, sortTree } from '@/apiUtils/jsonFormatter';
import { ObjectData } from '@/store/types';

const getRepository = async (req: NextApiRequest, res: NextApiResponse) => {
    const basePath = process.env.BASE_PATH;
    const { repoID, branch, pathSlug } = req.query;
    const pathToRepo = path.join(basePath, repoID as string);
    const pathArg = pathSlug ? `${branch}:${(pathSlug as string[]).join('/')}` : `${branch}`;

    try {
        await access(pathToRepo);

        const treeContent = formatTreeData(await gitWrapper(['ls-tree', pathArg], pathToRepo));
        const fullContent = await Promise.all(
            treeContent.map(async ({ name, type }) => {
                const newPath = pathSlug ? path.join(...pathSlug, name) : name;
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
                    name,
                    type,
                    ...formatCommitData(fullOut),
                };
            })
        );

        res.status(200).json(sortTree(fullContent as ObjectData[]));
    } catch (err) {
        res.status(404).send(err.message);
    }
};

export default getRepository;
