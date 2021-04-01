import { createRequest, createResponse } from 'node-mocks-http';
import { NextApiRequest, NextApiResponse } from 'next';
import { file } from '@/apiUtils/testData';
import {
    fsAccess,
    fsError,
    gitWrapperBlob,
    gitWrapperError,
} from '@/apiUtils/apiMocks';

let gitWrapper: (args: string[], cwd: string) => Promise<string>;
let getBlob: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
const req = createRequest<NextApiRequest>();
const res = createResponse<NextApiResponse>();

req.query = { repoID: 'testRepo', branch: 'main', pathSlug: ['lib', 'src', 'index.js'] };
res.json = jest.fn();
res.send = jest.fn();

describe('Blob api route', () => {
    describe('on success:', () => {
        beforeEach(async () => {
            jest.doMock('fs/promises', fsAccess);
            jest.doMock('@/apiUtils/gitWrapper', gitWrapperBlob);

            gitWrapper = (await import('@/apiUtils/gitWrapper')).default;
            getBlob = (await import('./[...pathSlug]')).default;

            jest.resetModules();

            await getBlob(req, res);
        });

        describe('calls gitWrapper', () => {
            it('3 times', () => {
                expect(gitWrapper).toBeCalledTimes(3);
            });

            it('first with git show', () => {
                expect(gitWrapper).nthCalledWith(
                    1,
                    ['show', 'main:lib/src/index.js'],
                    'C:\\repos\\testRepo'
                );
            });

            it('second with git cat-file', () => {
                expect(gitWrapper).nthCalledWith(
                    2,
                    ['cat-file', '-s', 'main:lib/src/index.js'],
                    'C:\\repos\\testRepo'
                );
            });

            it('third with git log', () => {
                expect(gitWrapper).nthCalledWith(
                    3,
                    [
                        'log',
                        '-1',
                        '--format=%h%n%s%n%an%n%ar%n%ad',
                        '--date=format:%d %b %Y, %H:%M',
                        'main',
                        '--',
                        'lib/src/index.js',
                    ],
                    'C:\\repos\\testRepo'
                );
            });

            describe('calls response methods', () => {
                it('with 200 status code', () => {
                    expect(res.statusCode).toBe(200);
                });

                it('with filtered branches', () => {
                    expect(res.json).toBeCalledWith(file);
                });
            });
        });
    });

    describe('on error', () => {
        describe('in base path:', () => {
            beforeEach(async () => {
                jest.doMock('fs/promises', fsError);
                jest.doMock('@/apiUtils/gitWrapper', gitWrapperBlob);

                gitWrapper = (await import('@/apiUtils/gitWrapper')).default;
                getBlob = (await import('./[...pathSlug]')).default;

                jest.resetModules();

                await getBlob(req, res);
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
                getBlob = (await import('./[...pathSlug]')).default;

                jest.resetModules();

                await getBlob(req, res);
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
