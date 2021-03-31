import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { render, screen } from '@testing-library/react';
import BreadCrumbs from './BreadCrumbs';

const mockStore = configureStore([]);
let store: Store;
let firstItem: Element;
let secondItem: Element;
let lastItem: Element;

describe('BreadCrumbs component should correct render', () => {
    describe('with path:', () => {
        beforeEach(() => {
            store = mockStore({
                current: {
                    repo: 'testRepo',
                    branch: 'main',
                    path: ['lib', 'src'],
                },
            });

            render(
                <Provider store={store}>
                    <BreadCrumbs />
                </Provider>
            );

            firstItem = screen.getByTestId('breadCrumbs').firstElementChild;
            secondItem = screen.getByTestId('breadCrumbs').children[1];
            lastItem = screen.getByTestId('breadCrumbs').lastElementChild;
        });

        describe('first item', () => {
            it('has correct name', () => {
                expect(firstItem).toHaveTextContent('testRepo');
            });

            it('is not active', () => {
                expect(firstItem).not.toHaveClass('BreadCrumbs-Item_active');
            });

            it('has link', () => {
                expect(firstItem.firstElementChild).toHaveAttribute('href', '/testRepo/tree/main');
            });
        });

        describe('second item', () => {
            it('has correct name', () => {
                expect(secondItem).toHaveTextContent('lib');
            });

            it('has link', () => {
                expect(secondItem.firstElementChild).toHaveAttribute(
                    'href',
                    '/testRepo/tree/main/lib'
                );
            });
        });

        describe('last item', () => {
            it('has correct name', () => {
                expect(lastItem).toHaveTextContent('src');
            });

            it('is active', () => {
                expect(lastItem).toHaveClass('BreadCrumbs-Item_active');
            });

            it('has no link', () => {
                expect(lastItem.firstElementChild).toEqual(null);
            });
        });
    });

    describe('without path:', () => {
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
                    <BreadCrumbs />
                </Provider>
            );

            firstItem = screen.getByTestId('breadCrumbs').firstElementChild;
        });

        describe('first item', () => {
            it('is active', () => {
                expect(firstItem).toHaveClass('BreadCrumbs-Item_active');
            });

            it('has no link', () => {
                expect(firstItem.firstElementChild).toEqual(null);
            });
        });
    });
});
