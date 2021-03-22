import { promises as fs } from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import gitWrapper from '@/apiUtils/gitWrapper';
import { formatBranches } from '@/apiUtils/jsonFormatter';

const getBranches = (req: NextApiRequest, res: NextApiResponse) => {
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
