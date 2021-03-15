import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { Request, Response } from 'express';
import { InitialDataType, FullDataType } from '../../../../src/store/types';

export const getInitialData = (out: string): InitialDataType[] => {
    const strings = out.split(/\n./);
    const objects = strings.map((obj) => ({
        name: obj.match(/(?<=\t).*/)[0],
        type: obj.match(/(?<=\s)\S*/)[0],
    }));
    return objects;
};

export const getFullData = (out: string): FullDataType => ({
    hash: out.match(/(?<=commit )\S{6}/)[0],
    message: out.match(/(?<=\n\n).*/)[0].trim(),
    commiter: out.match(/(?<=Author:).*(?=<)/)[0].trim(),
    date: out.match(/(?<=Date:).*(?=\+)/)[0].trim(),
});

const getRepository = (req: Request, res: Response): void => {
    const pathToRepos = process.env.DIR;
    const { repoID } = req.query;
    const commitHash = 'master';
    const pathToRepo = path.join(pathToRepos, repoID as string);

    fs.access(pathToRepo, (err) => {
        if (err) {
            res.status(404).send(`${pathToRepo} not found`);
        } else {
            let fullOut = '';
            const gitTree = spawn('git', ['ls-tree', commitHash], {
                cwd: pathToRepo,
            });
            gitTree.stdout.on('data', (chunk) => {
                fullOut += chunk.toString();
            });
            gitTree.on('error', (error) => {
                throw error;
            });
            gitTree.on('close', () => {
                if (!fullOut) {
                    res.status(404).send(`${commitHash} not found`);
                } else {
                    const promises: Promise<unknown>[] = [];
                    getInitialData(fullOut).forEach((obj) => {
                        // additional data request
                        const promise = new Promise((resolve) => {
                            let out = '';
                            const commitInfo = spawn(
                                'git',
                                ['log', '-1', commitHash, '--', obj.name],
                                { cwd: pathToRepo }
                            );
                            commitInfo.stdout.on('data', (chunk) => {
                                out += chunk.toString();
                            });
                            commitInfo.on('close', () => {
                                resolve(Object.assign(obj, getFullData(out)));
                            });
                        });
                        promises.push(promise);
                    });
                    const outerPromise = Promise.all(promises);
                    outerPromise.then((value) => res.json(value));
                }
            });
        }
    });
};

export default getRepository;
