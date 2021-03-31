import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { render, screen } from '@testing-library/react';
import Layout from './Layout';

const mockStore = configureStore([]);
let store: Store;

describe('Layout component should correct render', () => {
    describe('full data', () => {
        beforeEach(() => {
            store = mockStore({
                allRepos: ['testRepo1', 'testRepo2', 'testRepo'],
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
        });

        describe('on tree page (default):', () => {
            beforeEach(() => {
                render(
                    <Provider store={store}>
                        <Layout />
                    </Provider>
                );
            });

            it('breadCrumbs', () => {
                expect(screen.getByTestId('breadCrumbs')).toBeInTheDocument();
            });

            it('currentBar', () => {
                expect(screen.getByTestId('currentBar')).toBeInTheDocument();
            });

            it('tabs', () => {
                expect(screen.getByTestId('tabs')).toBeInTheDocument();
            });

            it('table', () => {
                expect(screen.getByTestId('table')).toBeInTheDocument();
            });

            it('no viewer', () => {
                expect(screen.queryByTestId('viewer')).not.toBeInTheDocument();
            });
        });

        describe('on blob page:', () => {
            beforeEach(() => {
                render(
                    <Provider store={store}>
                        <Layout type="blob" />
                    </Provider>
                );
            });

            it('breadCrumbs', () => {
                expect(screen.getByTestId('breadCrumbs')).toBeInTheDocument();
            });

            it('currentBar', () => {
                expect(screen.getByTestId('currentBar')).toBeInTheDocument();
            });

            it('tabs', () => {
                expect(screen.getByTestId('tabs')).toBeInTheDocument();
            });

            it('viewer', () => {
                expect(screen.getByTestId('viewer')).toBeInTheDocument();
            });

            it('no table', () => {
                expect(screen.queryByTestId('table')).not.toBeInTheDocument();
            });
        });

        describe('on error page:', () => {
            beforeEach(() => {
                render(
                    <Provider store={store}>
                        <Layout isError />
                    </Provider>
                );
            });

            it('error block', () => {
                expect(screen.getByTestId('notFound')).toBeInTheDocument();
            });

            it('no breadCrumbs', () => {
                expect(screen.queryByTestId('breadCrumbs')).not.toBeInTheDocument();
            });

            it('no currentBar', () => {
                expect(screen.queryByTestId('currentBar')).not.toBeInTheDocument();
            });

            it('no tabs', () => {
                expect(screen.queryByTestId('tabs')).not.toBeInTheDocument();
            });

            it('no viewer', () => {
                expect(screen.queryByTestId('viewer')).not.toBeInTheDocument();
            });

            it('no table', () => {
                expect(screen.queryByTestId('table')).not.toBeInTheDocument();
            });
        });
    });

    describe('on branches page:', () => {
        beforeEach(() => {
            store = mockStore({
                allRepos: ['testRepo1', 'testRepo2', 'testRepo'],
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
            });

            render(
                <Provider store={store}>
                    <Layout tableType="branches" />
                </Provider>
            );
        });

        it('breadCrumbs', () => {
            expect(screen.getByTestId('breadCrumbs')).toBeInTheDocument();
        });

        it('currentBar', () => {
            expect(screen.getByTestId('currentBar')).toBeInTheDocument();
        });

        it('tabs', () => {
            expect(screen.getByTestId('tabs')).toBeInTheDocument();
        });

        it('table', () => {
            expect(screen.getByTestId('table')).toBeInTheDocument();
        });

        it('no viewer', () => {
            expect(screen.queryByTestId('viewer')).not.toBeInTheDocument();
        });
    });

    describe('without branches data:', () => {
        beforeEach(() => {
            store = mockStore({
                allRepos: ['testRepo1', 'testRepo2', 'testRepo'],
                allBranches: [],
                current: {
                    repo: 'testRepo',
                    branch: '',
                    path: [],
                },
                treeData: [],
            });

            render(
                <Provider store={store}>
                    <Layout />
                </Provider>
            );
        });

        it('breadCrumbs', () => {
            expect(screen.getByTestId('breadCrumbs')).toBeInTheDocument();
        });

        it('currentBar', () => {
            expect(screen.getByTestId('currentBar')).toBeInTheDocument();
        });

        it('no tabs', () => {
            expect(screen.queryByTestId('tabs')).not.toBeInTheDocument();
        });

        it('no table', () => {
            expect(screen.queryByTestId('table')).not.toBeInTheDocument();
        });

        it('no viewer', () => {
            expect(screen.queryByTestId('viewer')).not.toBeInTheDocument();
        });
    });

    describe('without current repo:', () => {
        beforeEach(() => {
            store = mockStore({
                allRepos: ['testRepo1', 'testRepo2', 'testRepo'],
                allBranches: [],
                current: {
                    repo: '',
                    branch: '',
                    path: [],
                },
                treeData: [],
            });

            render(
                <Provider store={store}>
                    <Layout />
                </Provider>
            );
        });

        it('no breadCrumbs', () => {
            expect(screen.queryByTestId('breadCrumbs')).not.toBeInTheDocument();
        });

        it('no currentBar', () => {
            expect(screen.queryByTestId('currentBar')).not.toBeInTheDocument();
        });
    });
});
