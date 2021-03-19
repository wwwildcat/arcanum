import { promises as fs } from 'fs';
import path from 'path';
import { Request, Response } from 'express';

const getRepos = (req: Request, res: Response) => {
    const pathToRepos = process.env.DIR;

    fs.readdir(pathToRepos)
        .then((items) => {
            const repos = items.filter(async (item) =>
                (await fs.stat(path.resolve(pathToRepos, item))).isDirectory()
            );

            res.json(repos);
        })
        .catch((err: Error) => res.status(404).send(err.message));
};

export default getRepos;
