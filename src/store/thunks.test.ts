import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import fetch from 'jest-fetch-mock';
import { repos, branches, fullRootTree, file } from '@/apiUtils/testData';
import { initialState } from './createStore';
import { fetchRepos, getBlobData, getRepoData, getTreeData } from './thunks';
import {
    setRepos,
    setError,
    setRepo,
    setBranches,
    setBranch,
    setPath,
    setTreeData,
    setBlobData,
} from './actions';
import State, { BranchData, ObjectData } from './types';

let store: MockStoreEnhanced<State, ThunkDispatch<State, void, Action>>;
let actions: Action[];
let err: Error;
const middleware = [thunk];
const mockStore = configureMockStore<State, ThunkDispatch<State, void, Action>>(middleware);

describe('Thunk functions:', () => {
    beforeEach(() => {
        fetch.resetMocks();
        store = mockStore(initialState);
    });

    describe('fetchRepos', () => {
        describe('on success:', () => {
            beforeEach(async () => {
                actions = [setRepos(repos)];

                fetch.mockResponse(JSON.stringify(repos));

                await store.dispatch(fetchRepos());
            });

            it('use correct url', () => {
                expect(fetch).toBeCalledWith('http://localhost:3000/api/repos/');
            });

            it('dispatch setRepos', () => {
                expect(store.getActions()).toEqual(actions);
            });
        });

        describe('on error:', () => {
            beforeEach(async () => {
                err = new Error('fetch repos error');
                actions = [setError(err)];

                fetch.mockReject(err);

                await store.dispatch(fetchRepos());
            });

            it('dispatch setError', () => {
                expect(store.getActions()).toEqual(actions);
            });
        });
    });

    describe('getRepoData', () => {
        describe('on success', () => {
            beforeEach(() => {
                fetch.mockResponses(
                    [JSON.stringify(repos), { status: 200 }],
                    [JSON.stringify(branches), { status: 200 }]
                );
            });

            describe('without path:', () => {
                beforeEach(async () => {
                    actions = [
                        setRepos(repos),
                        setRepo('testRepo'),
                        setBranches(branches as BranchData[]),
                    ];

                    await store.dispatch(getRepoData('testRepo'));
                });

                it('use correct urls', () => {
                    expect(fetch.mock.calls.length).toEqual(2);
                    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/api/repos/');
                    expect(fetch.mock.calls[1][0]).toEqual(
                        'http://localhost:3000/api/repos/testRepo/branches'
                    );
                });

                it('dispatch correct actions', () => {
                    expect(store.getActions()).toEqual(actions);
                });
            });

            describe('with path:', () => {
                beforeEach(async () => {
                    await store.dispatch(getRepoData('testRepo', ['lib', 'src']));
                });

                it('use correct urls', () => {
                    expect(fetch.mock.calls.length).toEqual(2);
                    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/api/repos/');
                    expect(fetch.mock.calls[1][0]).toEqual(
                        'http://localhost:3000/api/repos/testRepo/branches/lib/src'
                    );
                });
            });
        });

        describe('with non-existing repo:', () => {
            beforeEach(async () => {
                actions = [setRepos(repos), setError(new Error('No such repo'))];

                fetch.mockResponse(JSON.stringify(repos));

                await store.dispatch(getRepoData('noRepo'));
            });

            it('dispatch setError', () => {
                expect(store.getActions()).toEqual(actions);
            });
        });

        describe('on error:', () => {
            beforeEach(async () => {
                err = new Error('fetch branches error');
                actions = [setRepos(repos), setRepo('testRepo'), setError(err)];

                fetch.once(JSON.stringify(repos)).mockReject(err);

                await store.dispatch(getRepoData('testRepo'));
            });

            it('dispatch setError', () => {
                expect(store.getActions()).toEqual(actions);
            });
        });
    });

    describe('getTreeData', () => {
        describe('on success', () => {
            beforeEach(() => {
                fetch.mockResponses(
                    [JSON.stringify(repos), { status: 200 }],
                    [JSON.stringify(branches), { status: 200 }],
                    [JSON.stringify(fullRootTree), { status: 200 }]
                );
            });

            describe('without path:', () => {
                beforeEach(async () => {
                    actions = [
                        setRepos(repos),
                        setRepo('testRepo'),
                        setBranches(branches as BranchData[]),
                        setBranch('main'),
                        setTreeData(fullRootTree as ObjectData[]),
                    ];

                    await store.dispatch(getTreeData('testRepo', 'main'));
                });

                it('use correct urls', () => {
                    expect(fetch.mock.calls.length).toEqual(3);
                    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/api/repos/');
                    expect(fetch.mock.calls[1][0]).toEqual(
                        'http://localhost:3000/api/repos/testRepo/branches'
                    );
                    expect(fetch.mock.calls[2][0]).toEqual(
                        'http://localhost:3000/api/repos/testRepo/tree/main'
                    );
                });

                it('dispatch correct actions', () => {
                    expect(store.getActions()).toEqual(actions);
                });
            });

            describe('with path:', () => {
                beforeEach(async () => {
                    actions = [
                        setRepos(repos),
                        setRepo('testRepo'),
                        setBranches(branches as BranchData[]),
                        setBranch('main'),
                        setTreeData(fullRootTree as ObjectData[]),
                        setPath(['lib', 'src']),
                    ];

                    await store.dispatch(getTreeData('testRepo', 'main', ['lib', 'src']));
                });

                it('use correct urls', () => {
                    expect(fetch.mock.calls.length).toEqual(3);
                    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/api/repos/');
                    expect(fetch.mock.calls[1][0]).toEqual(
                        'http://localhost:3000/api/repos/testRepo/branches/lib/src'
                    );
                    expect(fetch.mock.calls[2][0]).toEqual(
                        'http://localhost:3000/api/repos/testRepo/tree/main/lib/src'
                    );
                });

                it('dispatch correct actions', () => {
                    expect(store.getActions()).toEqual(actions);
                });
            });
        });

        describe('with non-existing branch:', () => {
            beforeEach(async () => {
                actions = [
                    setRepos(repos),
                    setRepo('testRepo'),
                    setBranches(branches as BranchData[]),
                    setError(new Error('No such branch')),
                ];

                fetch.mockResponses(
                    [JSON.stringify(repos), { status: 200 }],
                    [JSON.stringify(branches), { status: 200 }]
                );

                await store.dispatch(getTreeData('testRepo', 'noBranch'));
            });

            it('dispatch setError', () => {
                expect(store.getActions()).toEqual(actions);
            });
        });

        describe('on error:', () => {
            beforeEach(async () => {
                err = new Error('fetch tree error');
                actions = [
                    setRepos(repos),
                    setRepo('testRepo'),
                    setBranches(branches as BranchData[]),
                    setBranch('main'),
                    setError(err),
                ];

                fetch.once(JSON.stringify(repos)).once(JSON.stringify(branches)).mockReject(err);

                await store.dispatch(getTreeData('testRepo', 'main'));
            });

            it('dispatch setError', () => {
                expect(store.getActions()).toEqual(actions);
            });
        });
    });

    describe('getBlobData', () => {
        describe('on success', () => {
            beforeEach(async () => {
                fetch.mockResponses(
                    [JSON.stringify(repos), { status: 200 }],
                    [JSON.stringify(branches), { status: 200 }],
                    [JSON.stringify(file), { status: 200 }]
                );

                actions = [
                    setRepos(repos),
                    setRepo('testRepo'),
                    setBranches(branches as BranchData[]),
                    setBranch('main'),
                    setBlobData(file),
                    setPath(['lib', 'src', 'index.js']),
                ];

                await store.dispatch(getBlobData('testRepo', 'main', ['lib', 'src', 'index.js']));
            });

            it('use correct urls', () => {
                expect(fetch.mock.calls.length).toEqual(3);
                expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/api/repos/');
                expect(fetch.mock.calls[1][0]).toEqual(
                    'http://localhost:3000/api/repos/testRepo/branches/lib/src/index.js'
                );
                expect(fetch.mock.calls[2][0]).toEqual(
                    'http://localhost:3000/api/repos/testRepo/blob/main/lib/src/index.js'
                );
            });

            it('dispatch correct actions', () => {
                expect(store.getActions()).toEqual(actions);
            });
        });

        describe('on error:', () => {
            beforeEach(async () => {
                err = new Error('fetch blob error');
                actions = [
                    setRepos(repos),
                    setRepo('testRepo'),
                    setBranches(branches as BranchData[]),
                    setBranch('main'),
                    setError(err),
                ];

                fetch.once(JSON.stringify(repos)).once(JSON.stringify(branches)).mockReject(err);

                await store.dispatch(getBlobData('testRepo', 'main', ['lib', 'src', 'index.js']));
            });

            it('dispatch setError', () => {
                expect(store.getActions()).toEqual(actions);
            });
        });
    });
});
