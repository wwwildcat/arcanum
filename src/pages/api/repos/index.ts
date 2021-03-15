import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';

const getRepos = (req: Request, res: Response): void => {
    const pathToRepos = process.env.DIR;

    fs.readdir(pathToRepos, (err, items) => {
        if (err) {
            res.status(404).send(`${pathToRepos} not found`);
        }
        const repos = items.filter((item) =>
            fs.statSync(path.resolve(pathToRepos, item)).isDirectory()
        );
        res.json(repos);
    });
};

export default getRepos;
