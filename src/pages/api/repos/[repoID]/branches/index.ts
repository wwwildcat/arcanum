import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { Request, Response } from 'express';

const getFormattedBranches = (out: string) => {
    const branches = out.split(/\n/);
    branches.pop();

    return branches.map((branch) => ({
        type: 'branch',
        name: branch.split(/\s+/)[0],
        hash: branch.split(/\s+/)[1],
        date: branch.split(/\s+/).slice(2).join(' '),
    }));
};

const getBranches = (req: Request, res: Response): void => {
    const pathToRepos = process.env.DIR;
    const { repoID } = req.query;
    const pathToRepo = path.join(pathToRepos, repoID as string);

    fs.access(pathToRepo, (err) => {
        if (err) {
            res.status(404).send(`${pathToRepo} not found`);
        } else {
            let out = '';
            const gitBranch = spawn(
                'git',
                ['branch', '-v', '--format=%(refname:lstrip=2)%09%(objectname)%09%(committerdate)'],
                {
                    cwd: pathToRepo,
                }
            );

            gitBranch.stdout.on('data', (chunk) => {
                out += chunk.toString();
            });
            gitBranch.on('error', (error) => {
                throw error;
            });
            gitBranch.on('close', () => {
                res.json(getFormattedBranches(out));
            });
        }
    });
};

export default getBranches;
