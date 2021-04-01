import { access } from 'fs/promises';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import gitWrapper from '@/apiUtils/gitWrapper';
import { filterBranches, formatBranches } from '@/apiUtils/jsonFormatter';
import { BranchData } from '@/store/types';

const getBranches = async (req: NextApiRequest, res: NextApiResponse) => {
    const basePath = process.env.BASE_PATH;
    const { repoID, pathSlug } = req.query;
    const pathToRepo = path.join(basePath, repoID as string);
    const pathToObj = pathSlug && (pathSlug as string[]).join('/');

    try {
        await access(pathToRepo);

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

        const resultBranches = pathToObj
            ? await filterBranches(branches as BranchData[], (name) =>
                  gitWrapper(['cat-file', '-e', `${name}:${pathToObj}`], pathToRepo)
              )
            : branches;

        res.status(200).json(resultBranches);
    } catch (err) {
        res.status(404).send(err.message);
    }
};

export default getBranches;
