import { promises as fs } from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import gitWrapper from '../../../../utils/gitWrapper';
import { formatFile } from '../../../../utils/jsonFormatter';

const getFile = (req: Request, res: Response) => {
    const pathToRepos = process.env.DIR;
    const { repoID, branch, pathSlug } = req.query;
    const pathToRepo = path.join(pathToRepos, repoID as string);
    const pathToFile = (pathSlug as string[]).join('/');

    fs.access(pathToRepo)
        .then(async () => {
            const fileOut = await gitWrapper(['show', `${branch}:${pathToFile}`], pathToRepo);
            const sizeOut = await gitWrapper(
                ['cat-file', '-s', `${branch}:${pathToFile}`],
                pathToRepo
            );
            const commitOut = await gitWrapper(
                ['log', '-1', '--format=%h%n%s%n%an%n%ar%n%ad', `${branch}`, '--', pathToFile],
                pathToRepo
            );

            res.json(formatFile(fileOut, sizeOut, commitOut));
        })
        .catch((err: Error) => res.status(404).send(err.message));
};

export default getFile;
