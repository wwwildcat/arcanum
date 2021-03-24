import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Layout from '@/components/Layout/Layout';
import { initializeStore } from '@/store/createStore';
import { getBlobData } from '@/store/thunks';

export const getServerSideProps = async ({ params: { repoID, branch, pathSlug } }) => {
    const store = initializeStore();
    const { dispatch } = store;

    await dispatch(getBlobData(repoID, branch, pathSlug));

    const props = { initialReduxState: store.getState() };

    return { props: JSON.parse(JSON.stringify(props)), notFound: store.getState().error };
};

const FilePage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { repoID, branch, pathSlug } = router.query;

    useEffect(() => {
        dispatch(getBlobData(repoID as string, branch as string, pathSlug as string[]));
    }, [dispatch, repoID, branch, pathSlug]);

    return <Layout type="blob" />;
};

export default FilePage;
