import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { render, screen } from '@testing-library/react';
import Tabs from './Tabs';

const mockStore = configureStore([]);
let store: Store;
let firstTab: Element;
let secondTab: Element;
let thirdTab: Element;

describe('Tabs component should correct render', () => {
    describe('on non-root tree page:', () => {
        beforeEach(() => {
            store = mockStore({
                current: {
                    repo: 'testRepo',
                    branch: 'main',
                    path: ['lib'],
                },
            });

            render(
                <Provider store={store}>
                    <Tabs activeTab={0} type="tree" />
                </Provider>
            );

            firstTab = screen.getByTestId('tabs').firstElementChild;
            secondTab = screen.getByTestId('tabs').lastElementChild;
        });

        describe('first tab', () => {
            it('is active', () => {
                expect(firstTab).toHaveClass('Tabs-Item_active');
            });

            it('has no link', () => {
                expect(firstTab.firstElementChild).toEqual(null);
            });

            it('is FILES', () => {
                expect(firstTab).toHaveTextContent('FILES');
            });
        });

        describe('second tab', () => {
            it('is not active', () => {
                expect(secondTab).not.toHaveClass('Tabs-Item_active');
            });

            it('has link', () => {
                expect(secondTab.firstElementChild).toHaveAttribute(
                    'href',
                    '/testRepo/commits/main/lib'
                );
            });

            it('is HISTORY', () => {
                expect(secondTab).toHaveTextContent('HISTORY');
            });
        });
    });

    describe('on blob page:', () => {
        beforeEach(() => {
            store = mockStore({
                current: {
                    repo: 'testRepo',
                    branch: 'main',
                    path: ['README.md'],
                },
            });

            render(
                <Provider store={store}>
                    <Tabs activeTab={0} type="blob" />
                </Provider>
            );

            firstTab = screen.getByTestId('tabs').firstElementChild;
        });

        describe('first tab', () => {
            it('is DETAILS', () => {
                expect(firstTab).toHaveTextContent('DETAILS');
            });
        });
    });

    describe('on root tree page:', () => {
        beforeEach(() => {
            store = mockStore({
                current: {
                    repo: 'testRepo',
                    branch: 'main',
                    path: [],
                },
            });

            render(
                <Provider store={store}>
                    <Tabs activeTab={0} type="tree" />
                </Provider>
            );

            secondTab = screen.getByTestId('tabs').children[1];
            thirdTab = screen.getByTestId('tabs').children[2];
        });

        describe('second tab', () => {
            it('is not active', () => {
                expect(secondTab).not.toHaveClass('Tabs-Item_active');
            });

            it('has link', () => {
                expect(secondTab.firstElementChild).toHaveAttribute('href', '/testRepo/branches');
            });

            it('is BRANCHES', () => {
                expect(secondTab).toHaveTextContent('BRANCHES');
            });
        });

        describe('third tab', () => {
            it('is not active', () => {
                expect(thirdTab).not.toHaveClass('Tabs-Item_active');
            });

            it('has link', () => {
                expect(thirdTab.firstElementChild).toHaveAttribute(
                    'href',
                    '/testRepo/commits/main'
                );
            });

            it('is HISTORY', () => {
                expect(thirdTab).toHaveTextContent('HISTORY');
            });
        });
    });

    describe('on branches page:', () => {
        beforeEach(() => {
            store = mockStore({
                current: {
                    repo: 'testRepo',
                    branch: '',
                    path: [],
                },
            });

            render(
                <Provider store={store}>
                    <Tabs activeTab={1} type="tree" />
                </Provider>
            );

            firstTab = screen.getByTestId('tabs').firstElementChild;
            secondTab = screen.getByTestId('tabs').children[1];
        });

        describe('first tab', () => {
            it('is not active', () => {
                expect(firstTab).not.toHaveClass('Tabs-Item_active');
            });

            it('has link', () => {
                expect(firstTab.firstElementChild).toHaveAttribute('href', '/testRepo');
            });

            it('is FILES', () => {
                expect(firstTab).toHaveTextContent('FILES');
            });
        });

        describe('second tab', () => {
            it('is active', () => {
                expect(secondTab).toHaveClass('Tabs-Item_active');
            });

            it('has no link', () => {
                expect(secondTab.firstElementChild).toEqual(null);
            });

            it('is BRANCHES', () => {
                expect(secondTab).toHaveTextContent('BRANCHES');
            });
        });
    });
});
