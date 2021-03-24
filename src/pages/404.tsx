import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '@/components/Layout/Layout';
import { fetchRepos } from '@/store/thunks';

const ErrorPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRepos());
    }, [dispatch]);

    return <Layout isError />;
};

export default ErrorPage;
