import { createRequest, createResponse } from 'node-mocks-http';
import { NextApiRequest, NextApiResponse } from 'next';
import { fsMock, fsError } from '@/apiUtils/apiMocks';
import { repos } from '@/apiUtils/testData';

let getRepos: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
const req = createRequest<NextApiRequest>();
const res = createResponse<NextApiResponse>();

res.json = jest.fn();
res.send = jest.fn();

describe('Repos api route', () => {
    describe('on success:', () => {
        beforeEach(async () => {
            jest.doMock('fs/promises', fsMock);

            getRepos = (await import('./index')).default;

            jest.resetModules();

            await getRepos(req, res);
        });

        describe('calls response methods', () => {
            it('with 200 status code', () => {
                expect(res.statusCode).toBe(200);
            });

            it('with repos', () => {
                expect(res.json).toBeCalledWith(repos);
            });
        });
    });

    describe('on error:', () => {
        beforeEach(async () => {
            jest.doMock('fs/promises', fsError);

            getRepos = (await import('./index')).default;

            jest.resetModules();

            await getRepos(req, res);
        });

        describe('calls response methods', () => {
            it('with 404 status code', () => {
                expect(res.statusCode).toBe(404);
            });

            it('with base path readdir error', () => {
                expect(res.send).toBeCalledWith('base path readdir error');
            });
        });
    });
});
