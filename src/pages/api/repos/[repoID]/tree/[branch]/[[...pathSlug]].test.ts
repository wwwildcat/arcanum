import { createRequest, createResponse } from 'node-mocks-http';
import { NextApiRequest, NextApiResponse } from 'next';
import { fullRootTree, fullTree } from '@/apiUtils/testData';
import {
    fsAccess,
    fsError,
    gitWrapperRootTree,
    gitWrapperError,
    gitWrapperTree,
} from '@/apiUtils/apiMocks';

let gitWrapper: (args: string[], cwd: string) => Promise<string>;
let getTree: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
const req = createRequest<NextApiRequest>();
const res = createResponse<NextApiResponse>();

res.json = jest.fn();
res.send = jest.fn();

describe('Tree api route', () => {
    describe('on success', () => {
        describe('without pathSlug:', () => {
            beforeEach(async () => {
                jest.doMock('fs/promises', fsAccess);
                jest.doMock('@/apiUtils/gitWrapper', gitWrapperRootTree);

                gitWrapper = (await import('@/apiUtils/gitWrapper')).default;
                getTree = (await import('./[[...pathSlug]]')).default;

                jest.resetModules();

                req.query = { repoID: 'testRepo', branch: 'main' };

                await getTree(req, res);
            });

            describe('calls gitWrapper', () => {
                it('3 times', () => {
                    expect(gitWrapper).toBeCalledTimes(3);
                });

                it('first time with git ls-tree', () => {
                    expect(gitWrapper).nthCalledWith(1, ['ls-tree', 'main'], 'C:\\repos\\testRepo');
                });

                it('second time with git log', () => {
                    expect(gitWrapper).nthCalledWith(
                        2,
                        [
                            'log',
                            '-1',
                            '--format=%h%n%s%n%an%n%ar%n%ad',
                            '--date=format:%d %b %Y, %H:%M',
                            'main',
                            '--',
                            'lib',
                        ],
                        'C:\\repos\\testRepo'
                    );
                });
            });

            describe('calls response methods', () => {
                it('with 200 status code', () => {
                    expect(res.statusCode).toBe(200);
                });

                it('with filtered branches', () => {
                    expect(res.json).toBeCalledWith(fullRootTree);
                });
            });
        });

        describe('with pathSlug:', () => {
            beforeEach(async () => {
                jest.doMock('fs/promises', fsAccess);
                jest.doMock('@/apiUtils/gitWrapper', gitWrapperTree);

                gitWrapper = (await import('@/apiUtils/gitWrapper')).default;
                getTree = (await import('./[[...pathSlug]]')).default;

                jest.resetModules();

                req.query = { repoID: 'testRepo', branch: 'main', pathSlug: ['lib', 'src'] };

                await getTree(req, res);
            });

            describe('calls gitWrapper', () => {
                it('2 times', () => {
                    expect(gitWrapper).toBeCalledTimes(2);
                });

                it('first time with git ls-tree', () => {
                    expect(gitWrapper).nthCalledWith(
                        1,
                        ['ls-tree', 'main:lib/src'],
                        'C:\\repos\\testRepo'
                    );
                });

                it('second time with git log', () => {
                    expect(gitWrapper).nthCalledWith(
                        2,
                        [
                            'log',
                            '-1',
                            '--format=%h%n%s%n%an%n%ar%n%ad',
                            '--date=format:%d %b %Y, %H:%M',
                            'main',
                            '--',
                            'lib\\src\\index.js',
                        ],
                        'C:\\repos\\testRepo'
                    );
                });
            });

            describe('calls response methods', () => {
                it('with 200 status code', () => {
                    expect(res.statusCode).toBe(200);
                });

                it('with filtered branches', () => {
                    expect(res.json).toBeCalledWith(fullTree);
                });
            });
        });
    });

    describe('on error', () => {
        describe('in base path:', () => {
            beforeEach(async () => {
                jest.doMock('fs/promises', fsError);
                jest.doMock('@/apiUtils/gitWrapper', gitWrapperRootTree);

                gitWrapper = (await import('@/apiUtils/gitWrapper')).default;
                getTree = (await import('./[[...pathSlug]]')).default;

                jest.resetModules();

                req.query = { repoID: 'testRepo', branch: 'main' };

                await getTree(req, res);
            });

            describe('calls response methods', () => {
                it('with 404 status code', () => {
                    expect(res.statusCode).toBe(404);
                });

                it('with base path access error', () => {
                    expect(res.send).toBeCalledWith('base path access error');
                });
            });
        });

        describe('in git:', () => {
            beforeEach(async () => {
                jest.doMock('fs/promises', fsAccess);
                jest.doMock('@/apiUtils/gitWrapper', gitWrapperError);

                gitWrapper = (await import('@/apiUtils/gitWrapper')).default;
                getTree = (await import('./[[...pathSlug]]')).default;

                jest.resetModules();

                req.query = { repoID: 'testRepo', branch: 'main' };

                await getTree(req, res);
            });

            describe('calls response methods', () => {
                it('with 404 status code', () => {
                    expect(res.statusCode).toBe(404);
                });

                it('with git error', () => {
                    expect(res.send).toBeCalledWith('git error');
                });
            });
        });
    });
});
