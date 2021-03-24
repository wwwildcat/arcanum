import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '@/components/Layout/Layout';
import { initializeStore } from '@/store/createStore';
import { fetchRepos } from '@/store/thunks';

export const getServerSideProps = async () => {
    const store = initializeStore();
    const { dispatch } = store;

    await dispatch(fetchRepos());

    const props = { initialReduxState: store.getState() };

    return { props: JSON.parse(JSON.stringify(props)) };
};

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRepos());
    }, [dispatch]);

    return <Layout />;
};

export default HomePage;
