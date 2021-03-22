import React, { useEffect } from 'react';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import Layout from '@/components/Layout/Layout';
import { initializeStore } from '@/store/createStore';
import { fetchRepoList } from '@/store/thunks';
import State from '@/store/types';

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

    return <Layout noCurrentRepo />;
};

export default connect(null, mapDispatchToProps)(HomePage);
