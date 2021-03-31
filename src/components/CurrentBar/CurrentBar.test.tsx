import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { render, screen } from '@testing-library/react';
import CurrentBar from './CurrentBar';

const mockStore = configureStore([]);
let store: Store;
let name: Element;
let lastCommit: Element;

describe('CurrentBar component should correct render', () => {
    describe('with current branch', () => {
        describe('on non-root tree page:', () => {
            beforeEach(() => {
                store = mockStore({
                    allBranches: [
                        { name: 'feature1', date: '3 hours ago' },
                        { name: 'feature2', date: '7 days ago' },
                        { name: 'main', date: '1 min ago' },
                    ],
                    current: {
                        repo: 'testRepo',
                        branch: 'main',
                        path: ['lib', 'src'],
                    },
                    treeData: [
                        {
                            type: 'tree',
                            name: 'components',
                            hash: 'af6e95',
                            message: 'add component',
                            commiter: 'webg',
                            date: '3 weeks ago',
                            absDate: '30 Sep 2020, 22:47',
                        },
                        {
                            type: 'blob',
                            name: 'index.js',
                            hash: 'd53d0b',
                            message: 'fix lib',
                            commiter: 'mrc',
                            date: '2 days ago',
                            absDate: '20 Oct 2020, 12:24',
                        },
                    ],
                    blobData: null,
                });

                render(
                    <Provider store={store}>
                        <CurrentBar isBranches={false} type="tree" />
                    </Provider>
                );

                name = screen.getByTestId('currentBar').firstElementChild;
                lastCommit = screen.queryByTestId('currentBar-lastCommit');
            });

            it('name', () => {
                expect(name).toHaveTextContent('src');
            });

            it('branchList', () => {
                expect(screen.getByTestId('branchList')).toBeInTheDocument();
            });

            describe('lastCommit', () => {
                it('hash', () => {
                    expect(lastCommit.firstElementChild).toHaveTextContent('d53d0b');
                });

                it('date', () => {
                    expect(lastCommit.children[1]).toHaveTextContent('20 Oct 2020, 12:24');
                });

                it('commiter', () => {
                    expect(lastCommit.lastElementChild).toHaveTextContent('mrc');
                });
            });
        });

        describe('on root tree page:', () => {
            beforeEach(() => {
                store = mockStore({
                    allBranches: [
                        { name: 'feature1', date: '3 hours ago' },
                        { name: 'feature2', date: '7 days ago' },
                        { name: 'main', date: '1 min ago' },
                    ],
                    current: {
                        repo: 'testRepo',
                        branch: 'main',
                        path: [],
                    },
                    treeData: [
                        {
                            type: 'tree',
                            name: 'lib',
                            hash: 'd53d0b',
                            message: 'fix lib',
                            commiter: 'mrc',
                            date: '2 days ago',
                            absDate: '20 Oct 2020, 12:24',
                        },
                        {
                            type: 'blob',
                            name: 'README.md',
                            hash: 'a8ce35',
                            message: 'add readme',
                            commiter: 'webg',
                            date: '6 min ago',
                            absDate: '22 Oct 2020, 13:11',
                        },
                    ],
                    blobData: null,
                });

                render(
                    <Provider store={store}>
                        <CurrentBar isBranches={false} type="tree" />
                    </Provider>
                );

                name = screen.getByTestId('currentBar').firstElementChild;
            });

            it('name', () => {
                expect(name).toHaveTextContent('testRepo');
            });

            it('branchList', () => {
                expect(screen.getByTestId('branchList')).toBeInTheDocument();
            });

            it('last commit', () => {
                expect(screen.getByTestId('currentBar')).toHaveTextContent('Last commit');
            });
        });

        describe('on blob page:', () => {
            beforeEach(() => {
                store = mockStore({
                    allBranches: [
                        { name: 'feature1', date: '3 hours ago' },
                        { name: 'feature2', date: '7 days ago' },
                        { name: 'main', date: '1 min ago' },
                    ],
                    current: {
                        repo: 'testRepo',
                        branch: 'main',
                        path: ['README.md'],
                    },
                    treeData: [],
                    blobData: {
                        content: ['README.md', 'This is readme'],
                        size: '23',
                        hash: 'a8ce35',
                        message: 'add readme',
                        commiter: 'webg',
                        date: '6 min ago',
                        absDate: '22 Oct 2020, 13:11',
                    },
                });

                render(
                    <Provider store={store}>
                        <CurrentBar isBranches={false} type="blob" />
                    </Provider>
                );

                name = screen.getByTestId('currentBar').firstElementChild;
                lastCommit = screen.queryByTestId('currentBar-lastCommit');
            });

            it('name', () => {
                expect(name).toHaveTextContent('README.md');
            });

            it('branchList', () => {
                expect(screen.getByTestId('branchList')).toBeInTheDocument();
            });

            describe('lastCommit', () => {
                it('hash', () => {
                    expect(lastCommit.firstElementChild).toHaveTextContent('a8ce35');
                });

                it('date', () => {
                    expect(lastCommit.children[1]).toHaveTextContent('22 Oct 2020, 13:11');
                });

                it('commiter', () => {
                    expect(lastCommit.lastElementChild).toHaveTextContent('webg');
                });
            });
        });
    });

    describe('without current branch', () => {
        beforeEach(() => {
            store = mockStore({
                allBranches: [
                    { name: 'feature1', date: '3 hours ago' },
                    { name: 'feature2', date: '7 days ago' },
                    { name: 'main', date: '1 min ago' },
                ],
                current: {
                    repo: 'testRepo',
                    branch: '',
                    path: [],
                },
                treeData: [],
                blobData: null,
            });
        });

        describe('on files page:', () => {
            beforeEach(() => {
                render(
                    <Provider store={store}>
                        <CurrentBar isBranches={false} type="tree" />
                    </Provider>
                );

                lastCommit = screen.queryByTestId('currentBar-lastCommit');
            });

            it('branchList', () => {
                expect(screen.getByTestId('branchList')).toBeInTheDocument();
            });

            it('no last commit', () => {
                expect(lastCommit).not.toBeInTheDocument();
            });
        });

        describe('on branches page:', () => {
            beforeEach(() => {
                render(
                    <Provider store={store}>
                        <CurrentBar isBranches type="tree" />
                    </Provider>
                );

                lastCommit = screen.queryByTestId('currentBar-lastCommit');
            });

            it('no branchList', () => {
                expect(screen.queryByTestId('branchList')).not.toBeInTheDocument();
            });

            it('no last commit', () => {
                expect(lastCommit).not.toBeInTheDocument();
            });
        });
    });
});
