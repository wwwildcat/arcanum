import React, { useEffect } from 'react';
import Head from 'next/head';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { initializeStore } from '../store/createStore';
import { fetchRepoList } from '../store/thunks';
import State from '../store/types';

interface Props {
    setInitData: () => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => ({
    setInitData: () => {
        dispatch(fetchRepoList());
    },
});

export const getServerSideProps = () => {
    const store = initializeStore();
    const { dispatch } = store;

    mapDispatchToProps(dispatch).setInitData();

    const props = { initialReduxState: store.getState() };

    return { props: JSON.parse(JSON.stringify(props)) };
};

const HomePage = ({ setInitData }: Props) => {
    useEffect(() => {
        setInitData();
    });

    return (
        <>
            <Head>
                <title>Yandex Arcanum</title>
            </Head>
            <Header noRepo />
            <Footer />
        </>
    );
};

export default connect(null, mapDispatchToProps)(HomePage);
