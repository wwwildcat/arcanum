import { promises as fs } from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import gitWrapper from '@/apiUtils/gitWrapper';
import { formatBranches } from '@/apiUtils/jsonFormatter';

const getBranches = (req: NextApiRequest, res: NextApiResponse) => {
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
