import { readdir, stat } from 'fs/promises';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { filterRepos } from '@/apiUtils/jsonFormatter';

const getRepos = async (req: NextApiRequest, res: NextApiResponse) => {
    const basePath = process.env.BASE_PATH;

    try {
        const items = await readdir(basePath);
        const repos = await filterRepos(items, async (item: string) =>
            (await stat(path.resolve(basePath, item))).isDirectory()
        );

        res.status(200).json(repos);
    } catch (err) {
        res.status(404).send(err.message);
    }
};

export default getRepos;
