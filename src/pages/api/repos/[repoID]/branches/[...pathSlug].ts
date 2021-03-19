import { promises as fs } from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import gitWrapper from '../../../utils/gitWrapper';
import { formatBranches } from '../../../utils/jsonFormatter';

const getBranches = (req: Request, res: Response) => {
    const pathToRepos = process.env.DIR;
    const { repoID, pathSlug } = req.query;
    const pathToRepo = path.join(pathToRepos, repoID as string);
    const pathToObj = (pathSlug as string[]).join('/');

    fs.access(pathToRepo)
        .then(async () => {
            const commitOut = await gitWrapper(['log', '--format=%h', '--', pathToObj], pathToRepo);
            const firstCommit = commitOut.split(/\n/).reverse()[1];
            const branchOut = await gitWrapper(
                [
                    'branch',
                    '-v',
                    '--format=%(refname:lstrip=2)%09%(objectname)%09%(committerdate)',
                    '--contains',
                    firstCommit,
                ],
                pathToRepo
            );

            res.json(formatBranches(branchOut));
        })
        .catch((err: Error) => res.status(404).send(err.message));
};

export default getBranches;
