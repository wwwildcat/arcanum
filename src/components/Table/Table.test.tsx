import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { render, screen } from '@testing-library/react';
import Table from './Table';

const mockStore = configureStore([]);
let store: Store;
let tableRow: Element;
let tableCell: Element;
let tableIcon: HTMLElement | SVGElement;

describe('Table component should correct render', () => {
    describe('on tree page:', () => {
        beforeEach(() => {
            store = mockStore({
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
            });

            render(
                <Provider store={store}>
                    <Table tableType="files" />
                </Provider>
            );
        });

        describe('header:', () => {
            beforeEach(() => {
                tableRow = screen.getByTestId('table').firstElementChild;
            });

            it.each([
                ['Name', 0],
                ['Last commit', 1],
                ['Commit message', 2],
                ['Commiter', 3],
                ['Updated', 4],
            ])('has %s column', (title, i) => {
                expect(tableRow.children[i]).toHaveTextContent(title);
            });

            it('has no link on Name', () => {
                expect(tableRow.firstElementChild).not.toHaveAttribute('href');
            });
        });

        describe('tree item:', () => {
            beforeEach(() => {
                tableRow = screen.getByTestId('table').children[1];
                tableIcon = screen.getByTestId('table-icon-tree');
            });

            describe.each([
                ['name', 0, 'lib'],
                ['hash', 1, 'd53d0b'],
                ['message', 2, 'fix lib'],
                ['commiter', 3, 'mrc'],
                ['date', 4, '2 days ago'],
            ])('%s cell', (type, i, content) => {
                beforeEach(() => {
                    tableCell = tableRow.children[i];
                });

                it('has correct class', () => {
                    expect(tableCell).toHaveClass(`Table-Cell_content_${type}`);
                });

                it('has correct content', () => {
                    expect(tableCell).toHaveTextContent(content);
                });
            });

            it('has correct icon', () => {
                expect(tableRow.firstElementChild).toContainElement(tableIcon);
            });

            it('has link on Name', () => {
                expect(tableRow.firstElementChild.firstElementChild).toHaveAttribute(
                    'href',
                    '/testRepo/tree/main/lib'
                );
            });

            it('has link on arrow button', () => {
                expect(tableRow.lastElementChild).toHaveAttribute(
                    'href',
                    '/testRepo/tree/main/lib'
                );
            });
        });

        describe('blob item:', () => {
            beforeEach(() => {
                tableRow = screen.getByTestId('table').lastElementChild;
                tableIcon = screen.getByTestId('table-icon-blob');
            });

            it('has correct icon', () => {
                expect(tableRow.firstElementChild).toContainElement(tableIcon);
            });

            it('has link on Name', () => {
                expect(tableRow.firstElementChild.firstElementChild).toHaveAttribute(
                    'href',
                    '/testRepo/blob/main/README.md'
                );
            });

            it('has link on arrow button', () => {
                expect(tableRow.lastElementChild).toHaveAttribute(
                    'href',
                    '/testRepo/blob/main/README.md'
                );
            });
        });
    });

    describe('on branches page:', () => {
        beforeEach(() => {
            store = mockStore({
                allBranches: [
                    {
                        type: 'branch',
                        name: 'main',
                        hash: 'e808710615e7090ebc51091982c9f48dfef2861f',
                    },
                ],
                current: {
                    repo: 'testRepo',
                    branch: 'main',
                    path: [],
                },
            });

            render(
                <Provider store={store}>
                    <Table tableType="branches" />
                </Provider>
            );
        });

        describe('header:', () => {
            beforeEach(() => {
                tableRow = screen.getByTestId('table').firstElementChild;
            });

            it.each([
                ['Name', 0],
                ['Commit hash', 1],
            ])('has %s column', (title, i) => {
                expect(tableRow.children[i]).toHaveTextContent(title);
            });

            it('has no link on Name', () => {
                expect(tableRow.firstElementChild).not.toHaveAttribute('href');
            });
        });

        describe('branch item:', () => {
            beforeEach(() => {
                tableRow = screen.getByTestId('table').children[1];
                tableIcon = screen.getByTestId('table-icon-branch');
            });

            describe.each([
                ['name', 0, 'main'],
                ['hash', 1, 'e808710615e7090ebc51091982c9f48dfef2861f'],
            ])('%s cell', (type, i, content) => {
                beforeEach(() => {
                    tableCell = tableRow.children[i];
                });

                it('has correct class', () => {
                    expect(tableCell).toHaveClass(`Table-Cell_content_${type}`);
                });

                it('has correct content', () => {
                    expect(tableCell).toHaveTextContent(content);
                });
            });

            it('has correct icon', () => {
                expect(tableRow.firstElementChild).toContainElement(tableIcon);
            });

            it('has link on Name', () => {
                expect(tableRow.firstElementChild.firstElementChild).toHaveAttribute(
                    'href',
                    '/testRepo/tree/main'
                );
            });

            it('has link on arrow button', () => {
                expect(tableRow.lastElementChild).toHaveAttribute('href', '/testRepo/tree/main');
            });
        });
    });
});
