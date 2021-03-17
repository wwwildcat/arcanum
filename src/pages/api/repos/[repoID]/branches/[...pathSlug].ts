import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { Request, Response } from 'express';

const getFormattedBranches = (out: string) => {
    const branches = out.split(/\n/);
    branches.pop();

    return branches.map((branch) => ({
        name: branch.split(/\s+/)[0],
        hash: branch.split(/\s+/)[1],
        date: branch.split(/\s+/).slice(2).join(' '),
    }));
};

const getBranches = (req: Request, res: Response): void => {
    const pathToRepos = process.env.DIR;
    const { repoID, pathSlug } = req.query;
    const pathToRepo = path.join(pathToRepos, repoID as string);
    const pathToObj = (pathSlug as string[]).join('/');

    fs.access(pathToRepo, (err) => {
        if (err) {
            res.status(404).send(`${pathToRepo} not found`);
        } else {
            let commitOut = '';
            const gitCommit = spawn('git', ['log', '--format=%h', '--', pathToObj], {
                cwd: pathToRepo,
            });

            gitCommit.stdout.on('data', (chunk) => {
                commitOut += chunk.toString();
            });
            gitCommit.on('error', (error) => {
                throw error;
            });
            gitCommit.on('close', () => {
                let branchOut = '';
                const firstCommit = commitOut.split(/\n/).reverse()[1];
                const gitBranch = spawn(
                    'git',
                    [
                        'branch',
                        '-v',
                        '--format=%(refname:lstrip=2)%09%(objectname)%09%(committerdate)',
                        '--contains',
                        firstCommit,
                    ],
                    {
                        cwd: pathToRepo,
                    }
                );

                gitBranch.stdout.on('data', (chunk) => {
                    branchOut += chunk.toString();
                });
                gitBranch.on('error', (error) => {
                    throw error;
                });
                gitBranch.on('close', () => {
                    res.json(getFormattedBranches(branchOut));
                });
            });
        }
    });
};

export default getBranches;
