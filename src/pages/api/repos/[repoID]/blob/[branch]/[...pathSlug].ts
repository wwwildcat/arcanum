import { promises as fs } from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import gitWrapper from '@/apiUtils/gitWrapper';
import { formatFile } from '@/apiUtils/jsonFormatter';

const getFile = (req: NextApiRequest, res: NextApiResponse) => {
    const basePath = process.env.BASE_PATH;
    const { repoID, branch, pathSlug } = req.query;
    const pathToRepo = path.join(basePath, repoID as string);
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

            res.status(200).json(formatFile(fileOut, sizeOut, commitOut));
        })
        .catch((err: Error) => res.status(404).send(err.message));
};

export default getFile;
