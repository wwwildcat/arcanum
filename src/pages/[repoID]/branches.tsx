import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Layout from '@/components/Layout/Layout';
import { initializeStore } from '@/store/createStore';
import { getRepoData } from '@/store/thunks';

export const getServerSideProps = async ({ params: { repoID } }) => {
    const store = initializeStore();
    const { dispatch } = store;

    await dispatch(getRepoData(repoID));

    const props = { initialReduxState: store.getState() };

    return { props: JSON.parse(JSON.stringify(props)), notFound: store.getState().error };
};

const BranchesPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { repoID } = router.query;

    useEffect(() => {
        dispatch(getRepoData(repoID as string));
    }, [dispatch, repoID]);

    return <Layout activeTab={1} tableType="branches" />;
};

export default BranchesPage;
