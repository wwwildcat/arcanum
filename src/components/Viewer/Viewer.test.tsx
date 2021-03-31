import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { render, screen } from '@testing-library/react';
import Viewer from './Viewer';

const mockStore = configureStore([]);
let store: Store;
let header: Element;
let lastLine: Element;

describe('Viewer component should correct render', () => {
    beforeEach(() => {
        store = mockStore({
            current: {
                path: ['lib', 'src', 'index.js'],
            },
            blobData: {
                content: ['#!/usr/bin/env node', '', 'console.log("Hello World!");'],
                size: '47',
            },
        });

        render(
            <Provider store={store}>
                <Viewer />
            </Provider>
        );

        header = screen.getByTestId('viewer').firstElementChild;
        lastLine = screen.getByTestId('viewer').lastElementChild.lastElementChild;
    });

    it('file name', () => {
        expect(header).toHaveTextContent('index.js');
    });

    it('file size', () => {
        expect(header.lastElementChild).toHaveTextContent('(47 bytes)');
    });

    it('line number', () => {
        expect(lastLine.firstElementChild).toHaveTextContent('3');
    });

    it('file line', () => {
        expect(lastLine).toHaveTextContent('console.log("Hello World!");');
    });
});
