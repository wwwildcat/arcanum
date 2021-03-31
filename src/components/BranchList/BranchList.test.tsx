import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { render, screen, fireEvent } from '@testing-library/react';
import BranchList from './BranchList';

const mockStore = configureStore([]);
let store: Store;
let arrow: Element;
let dropdown: Element;
let firstItem: Element;
let lastItem: Element;

describe('BranchList component should correct render', () => {
    describe('with current branch', () => {
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
            });

            render(
                <Provider store={store}>
                    <BranchList type="tree" />
                </Provider>
            );

            arrow = screen.getByTestId('branchList').children[1];
            dropdown = screen.getByTestId('branchList').lastElementChild;
        });

        it('current branch name', () => {
            expect(screen.getByTestId('branchList').firstElementChild).toHaveTextContent('main');
        });

        it('arrow direction', () => {
            expect(arrow).toHaveClass('BranchList-Arrow_closed');
        });

        it('dropdown', () => {
            expect(dropdown).toHaveClass('BranchList-Dropdown_closed');
        });

        describe('after click on arrow:', () => {
            beforeEach(() => {
                fireEvent.click(arrow);
            });

            it('arrow direction', () => {
                expect(arrow).not.toHaveClass('BranchList-Arrow_closed');
            });

            it('dropdown', () => {
                expect(dropdown).not.toHaveClass('BranchList-Dropdown_closed');
            });

            describe('first item', () => {
                beforeEach(() => {
                    firstItem = dropdown.firstElementChild;
                });

                it('is selected branch', () => {
                    expect(firstItem).toHaveClass('BranchList-Item_selected');
                });

                it('has selected branch name', () => {
                    expect(firstItem).toHaveTextContent('main');
                });

                it('has no link', () => {
                    expect(firstItem.firstElementChild).not.toHaveAttribute('href');
                });

                it('has last commit of selected branch', () => {
                    expect(firstItem.lastElementChild).toHaveTextContent('Last commit 1 min ago');
                });
            });

            describe('last item', () => {
                beforeEach(() => {
                    lastItem = dropdown.lastElementChild;
                });

                it('has non-selected branch name', () => {
                    expect(lastItem).toHaveTextContent('feature2');
                });

                it('has link', () => {
                    expect(lastItem.firstElementChild).toHaveAttribute(
                        'href',
                        '/testRepo/tree/feature2'
                    );
                });

                it('has last commit of non-selected branch', () => {
                    expect(lastItem.firstElementChild.lastElementChild).toHaveTextContent(
                        'Last commit 7 days ago'
                    );
                });
            });
        });
    });

    describe('without current branch:', () => {
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
            });

            render(
                <Provider store={store}>
                    <BranchList type="tree" />
                </Provider>
            );

            arrow = screen.getByTestId('branchList').children[1];
            dropdown = screen.getByTestId('branchList').lastElementChild;
        });

        it('no current branch name', () => {
            expect(screen.getByTestId('branchList').firstElementChild).toHaveTextContent(
                'Select branch'
            );
        });

        it('arrow direction', () => {
            expect(arrow).not.toHaveClass('BranchList-Arrow_closed');
        });

        it('dropdown', () => {
            expect(dropdown).not.toHaveClass('BranchList-Dropdown_closed');
        });

        describe('first item', () => {
            beforeEach(() => {
                firstItem = dropdown.firstElementChild;
            });

            it('is not selected branch', () => {
                expect(firstItem).not.toHaveClass('BranchList-Item_selected');
            });

            it('has link', () => {
                expect(firstItem.firstElementChild).toHaveAttribute(
                    'href',
                    '/testRepo/tree/feature1'
                );
            });
        });
    });
});
