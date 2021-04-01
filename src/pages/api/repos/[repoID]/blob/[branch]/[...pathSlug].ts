import { access } from 'fs/promises';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import gitWrapper from '@/apiUtils/gitWrapper';
import { formatFile } from '@/apiUtils/jsonFormatter';

const getBlob = async (req: NextApiRequest, res: NextApiResponse) => {
    const basePath = process.env.BASE_PATH;
    const { repoID, branch, pathSlug } = req.query;
    const pathToRepo = path.join(basePath, repoID as string);
    const pathToFile = (pathSlug as string[]).join('/');

    try {
        await access(pathToRepo);

        const fileOut = await gitWrapper(['show', `${branch}:${pathToFile}`], pathToRepo);
        const sizeOut = await gitWrapper(['cat-file', '-s', `${branch}:${pathToFile}`], pathToRepo);
        const commitOut = await gitWrapper(
            [
                'log',
                '-1',
                '--format=%h%n%s%n%an%n%ar%n%ad',
                '--date=format:%d %b %Y, %H:%M',
                `${branch}`,
                '--',
                pathToFile,
            ],
            pathToRepo
        );

        res.status(200).json(formatFile(fileOut, sizeOut, commitOut));
    } catch (err) {
        res.status(404).send(err.message);
    }
};

export default getBlob;
