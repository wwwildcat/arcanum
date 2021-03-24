import { promises as fs } from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

const getRepos = (req: NextApiRequest, res: NextApiResponse) => {
    const basePath = process.env.BASE_PATH;

    fs.readdir(basePath)
        .then((items) => {
            const repos = items.filter(async (item) =>
                (await fs.stat(path.resolve(basePath, item))).isDirectory()
            );

            res.status(200).json(repos);
        })
        .catch((err: Error) => res.status(404).send(err.message));
};

export default getRepos;
