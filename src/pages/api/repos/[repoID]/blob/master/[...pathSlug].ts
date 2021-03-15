import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { Request, Response } from 'express';

export const getFormattedFile = (out: string): string[] => {
    const fileLines = out.split(/\n/);

    if (fileLines.length > 1) {
        fileLines.pop(); // remove the last empty string
    }

    return fileLines;
};

const getFile = (req: Request, res: Response): void => {
    const pathToRepos = process.env.DIR;
    const { repoID, pathSlug } = req.query;
    const pathToRepo = path.join(pathToRepos, repoID as string);
    const pathToFile = (pathSlug as string[]).join('/');
    const commitHash = 'master';

    fs.access(pathToRepo, (err) => {
        if (err) {
            res.status(404).send(`${pathToRepo} not found`);
        } else {
            let out = '';
            const gitBlob = spawn('git', ['show', `${commitHash}:${pathToFile}`], {
                cwd: pathToRepo,
            });
            gitBlob.stdout.on('data', (chunk) => {
                out += chunk.toString();
            });
            gitBlob.on('error', (error) => {
                throw error;
            });
            gitBlob.on('close', () => {
                if (!out) {
                    res.status(404).send(`${commitHash} not found`);
                } else {
                    res.json(getFormattedFile(out));
                }
            });
        }
    });
};

export default getFile;
