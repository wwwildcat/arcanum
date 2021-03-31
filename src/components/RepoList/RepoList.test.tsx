import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { render, screen, fireEvent } from '@testing-library/react';
import RepoList from './RepoList';

const mockStore = configureStore([]);
let store: Store;
let current: Element;
let arrow: Element;
let dropdown: Element;
let firstItem: Element;
let lastItem: Element;

describe('RepoList component should correct render', () => {
    describe('with current repo', () => {
        beforeEach(() => {
            store = mockStore({
                allRepos: ['testRepo1', 'testRepo2', 'testRepo'],
                current: {
                    repo: 'testRepo',
                },
            });

            render(
                <Provider store={store}>
                    <RepoList isError={false} />
                </Provider>
            );

            current = screen.getByTestId('repoList').firstElementChild;
            arrow = screen.getByTestId('repoList').children[1];
            dropdown = screen.getByTestId('repoList').lastElementChild;
        });

        it('text content', () => {
            expect(current).toHaveTextContent('Repository ');
        });

        it('current repo name', () => {
            expect(current.firstElementChild).toHaveTextContent('testRepo');
        });

        it('arrow direction', () => {
            expect(arrow).toHaveClass('RepoList-Arrow_closed');
        });

        it('dropdown', () => {
            expect(dropdown).toHaveClass('RepoList-Dropdown_closed');
        });

        describe('after click on arrow:', () => {
            beforeEach(() => {
                fireEvent.click(arrow);
            });

            it('arrow direction', () => {
                expect(arrow).not.toHaveClass('RepoList-Arrow_closed');
            });

            it('dropdown', () => {
                expect(dropdown).not.toHaveClass('RepoList-Dropdown_closed');
            });

            describe('first item', () => {
                beforeEach(() => {
                    firstItem = dropdown.firstElementChild;
                });

                it('is selected repo', () => {
                    expect(firstItem).toHaveClass('RepoList-Item_selected');
                });

                it('has selected repo name', () => {
                    expect(firstItem).toHaveTextContent('testRepo');
                });

                it('has no link', () => {
                    expect(firstItem.firstElementChild).toEqual(null);
                });
            });

            describe('last item', () => {
                beforeEach(() => {
                    lastItem = dropdown.lastElementChild;
                });

                it('has non-selected repo name', () => {
                    expect(lastItem).toHaveTextContent('testRepo2');
                });

                it('has link', () => {
                    expect(lastItem.firstElementChild).toHaveAttribute('href', '/testRepo2');
                });
            });
        });
    });

    describe('without current repo:', () => {
        beforeEach(() => {
            store = mockStore({
                allRepos: ['testRepo1', 'testRepo2', 'testRepo'],
                current: {
                    repo: '',
                },
            });

            render(
                <Provider store={store}>
                    <RepoList isError={false} />
                </Provider>
            );

            current = screen.getByTestId('repoList').firstElementChild;
            arrow = screen.getByTestId('repoList').children[1];
            dropdown = screen.getByTestId('repoList').lastElementChild;
        });

        it('text content', () => {
            expect(current).toHaveTextContent('Select repository');
        });

        it('no current repo name', () => {
            expect(current.firstElementChild).toBeEmptyDOMElement();
        });

        it('arrow direction', () => {
            expect(arrow).not.toHaveClass('RepoList-Arrow_closed');
        });

        it('dropdown', () => {
            expect(dropdown).not.toHaveClass('RepoList-Dropdown_closed');
        });

        describe('first item', () => {
            beforeEach(() => {
                firstItem = dropdown.firstElementChild;
            });

            it('is not selected repo', () => {
                expect(firstItem).not.toHaveClass('RepoList-Item_selected');
            });

            it('has link', () => {
                expect(firstItem.firstElementChild).toHaveAttribute('href', '/testRepo1');
            });
        });
    });

    describe('with error:', () => {
        beforeEach(() => {
            store = mockStore({
                allRepos: ['testRepo1', 'testRepo2', 'testRepo'],
                current: {
                    repo: 'testRepo',
                },
            });

            render(
                <Provider store={store}>
                    <RepoList isError />
                </Provider>
            );

            current = screen.getByTestId('repoList').firstElementChild;
            arrow = screen.getByTestId('repoList').children[1];
            dropdown = screen.getByTestId('repoList').lastElementChild;
        });

        it('text content', () => {
            expect(current).toHaveTextContent('Select repository');
        });

        it('no current repo name', () => {
            expect(current.firstElementChild).toBeEmptyDOMElement();
        });

        it('arrow direction', () => {
            expect(arrow).not.toHaveClass('RepoList-Arrow_closed');
        });

        it('dropdown', () => {
            expect(dropdown).not.toHaveClass('RepoList-Dropdown_closed');
        });

        describe('first item', () => {
            beforeEach(() => {
                firstItem = dropdown.firstElementChild;
            });

            it('is not selected repo', () => {
                expect(firstItem).not.toHaveClass('RepoList-Item_selected');
            });

            it('has link', () => {
                expect(firstItem.firstElementChild).toHaveAttribute('href', '/testRepo1');
            });
        });
    });
});
