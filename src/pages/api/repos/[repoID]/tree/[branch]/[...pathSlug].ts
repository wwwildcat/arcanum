import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { Request, Response } from 'express';
import { InitialContentData, FullContentData } from '../../../../../../store/types';

export const getInitialData = (out: string): InitialContentData[] => {
    const strings = out.split(/\n./);
    const objects = strings.map((obj) => ({
        name: obj.match(/(?<=\t).*/)[0],
        type: obj.match(/(?<=\s)\S*/)[0],
    }));
    return objects;
};

export const getFullData = (out: string): FullContentData => ({
    hash: out.match(/(?<=commit )\S{6}/)[0],
    message: out.match(/(?<=\n\n).*/)[0].trim(),
    commiter: out.match(/(?<=Author:).*(?=<)/)[0].trim(),
    date: out.match(/(?<=Date:).*(?=\+)/)[0].trim(),
});

const getRepository = (req: Request, res: Response): void => {
    const pathToRepos = process.env.DIR;
    const { repoID, branch, pathSlug } = req.query;
    const pathToRepo = path.join(pathToRepos, repoID as string);
    const pathToDir = (pathSlug as string[]).join('/');
    const fullPath = path.join(pathToRepo, pathToDir);

    fs.access(fullPath, (err) => {
        if (err) {
            res.status(404).send(`${fullPath} not found`);
        } else {
            let fullOut = '';
            const gitTree = spawn('git', ['ls-tree', `${branch}:${pathToDir}`], {
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
                    res.status(404).send(`${branch} not found`);
                } else {
                    const promises: Promise<unknown>[] = [];
                    getInitialData(fullOut).forEach((obj) => {
                        // additional data request
                        const promise = new Promise((resolve) => {
                            let out = '';
                            const commitInfo = spawn(
                                'git',
                                ['log', '-1', `${branch}`, '--', obj.name],
                                { cwd: fullPath }
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
