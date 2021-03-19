import { promises as fs } from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import gitWrapper from '../../../utils/gitWrapper';
import { formatBranches } from '../../../utils/jsonFormatter';

const getBranches = (req: Request, res: Response) => {
    const pathToRepos = process.env.DIR;
    const { repoID } = req.query;
    const pathToRepo = path.join(pathToRepos, repoID as string);

    fs.access(pathToRepo)
        .then(async () => {
            const out = await gitWrapper(
                ['branch', '-v', '--format=%(refname:lstrip=2)%09%(objectname)%09%(committerdate)'],
                pathToRepo
            );

            res.json(formatBranches(out));
        })
        .catch((err: Error) => res.status(404).send(err.message));
};

export default getBranches;
