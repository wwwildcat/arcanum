import { promises as fs } from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import gitWrapper from '@/apiUtils/gitWrapper';
import { formatBranches } from '@/apiUtils/jsonFormatter';

const getBranches = (req: NextApiRequest, res: NextApiResponse) => {
    const pathToRepos = process.env.DIR;
    const { repoID, pathSlug } = req.query;
    const pathToRepo = path.join(pathToRepos, repoID as string);
    const pathToObj = pathSlug && (pathSlug as string[]).join('/');

    fs.access(pathToRepo)
        .then(async () => {
            const branches = formatBranches(
                await gitWrapper(
                    [
                        'branch',
                        '-v',
                        '--format=%(refname:lstrip=2)%09%(objectname)%09%(committerdate:relative)',
                    ],
                    pathToRepo
                )
            );
            const filteredBranches = pathToObj ? [] : [...branches];

            if (pathToObj) {
                (
                    await Promise.allSettled(
                        branches.map(({ name }) =>
                            gitWrapper(['cat-file', '-e', `${name}:${pathToObj}`], pathToRepo)
                        )
                    )
                ).forEach(({ status }, i) => {
                    if (status === 'fulfilled') {
                        filteredBranches.push(branches[i]);
                    }
                });
            }

            res.status(200).json(filteredBranches);
        })
        .catch((err: Error) => res.status(404).send(err.message));
};

export default getBranches;
