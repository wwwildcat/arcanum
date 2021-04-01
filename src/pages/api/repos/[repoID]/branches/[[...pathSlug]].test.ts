import { createRequest, createResponse } from 'node-mocks-http';
import { NextApiRequest, NextApiResponse } from 'next';
import { branches, filteredBranches } from '@/apiUtils/testData';
import { fsAccess, fsError, gitWrapperBranches, gitWrapperError } from '@/apiUtils/apiMocks';

let gitWrapper: (args: string[], cwd: string) => Promise<string>;
let getBranches: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
const req = createRequest<NextApiRequest>();
const res = createResponse<NextApiResponse>();

res.json = jest.fn();
res.send = jest.fn();

describe('Branches api route', () => {
    describe('on success', () => {
        beforeEach(async () => {
            jest.doMock('fs/promises', fsAccess);
            jest.doMock('@/apiUtils/gitWrapper', gitWrapperBranches);

            gitWrapper = (await import('@/apiUtils/gitWrapper')).default;
            getBranches = (await import('./[[...pathSlug]]')).default;

            jest.resetModules();
        });

        describe('without pathSlug:', () => {
            beforeEach(async () => {
                req.query = { repoID: 'testRepo' };

                await getBranches(req, res);
            });

            describe('calls gitWrapper', () => {
                it('1 time', () => {
                    expect(gitWrapper).toBeCalledTimes(1);
                });

                it('with git branch', () => {
                    expect(gitWrapper).toBeCalledWith(
                        [
                            'branch',
                            '-v',
                            '--format=%(refname:lstrip=2)%09%(objectname)%09%(committerdate:relative)',
                        ],
                        'C:\\repos\\testRepo'
                    );
                });
            });

            describe('calls response methods', () => {
                it('with 200 status code', () => {
                    expect(res.statusCode).toBe(200);
                });

                it('with non-filtered branches', () => {
                    expect(res.json).toBeCalledWith(branches);
                });
            });
        });

        describe('with pathSlug:', () => {
            beforeEach(async () => {
                req.query = { repoID: 'testRepo', pathSlug: ['lib', 'src'] };

                await getBranches(req, res);
            });

            describe('calls gitWrapper', () => {
                it('4 times', () => {
                    expect(gitWrapper).toBeCalledTimes(4);
                });

                it('first time with git branch', () => {
                    expect(gitWrapper).nthCalledWith(
                        1,
                        [
                            'branch',
                            '-v',
                            '--format=%(refname:lstrip=2)%09%(objectname)%09%(committerdate:relative)',
                        ],
                        'C:\\repos\\testRepo'
                    );
                });

                it('second time with git cat-file', () => {
                    expect(gitWrapper).nthCalledWith(
                        2,
                        ['cat-file', '-e', 'feature1:lib/src'],
                        'C:\\repos\\testRepo'
                    );
                });
            });

            describe('calls response methods', () => {
                it('with 200 status code', () => {
                    expect(res.statusCode).toBe(200);
                });

                it('with filtered branches', () => {
                    expect(res.json).toBeCalledWith(filteredBranches);
                });
            });
        });
    });

    describe('on error', () => {
        describe('in base path:', () => {
            beforeEach(async () => {
                jest.doMock('fs/promises', fsError);
                jest.doMock('@/apiUtils/gitWrapper', gitWrapperBranches);

                gitWrapper = (await import('@/apiUtils/gitWrapper')).default;
                getBranches = (await import('./[[...pathSlug]]')).default;

                jest.resetModules();

                req.query = { repoID: 'testRepo' };

                await getBranches(req, res);
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
                getBranches = (await import('./[[...pathSlug]]')).default;

                jest.resetModules();

                req.query = { repoID: 'testRepo' };

                await getBranches(req, res);
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
