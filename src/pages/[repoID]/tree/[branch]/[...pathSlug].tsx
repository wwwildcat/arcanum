import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Layout from '@/components/Layout/Layout';
import { initializeStore } from '@/store/createStore';
import { setRepo, setBranch, setPath, setView } from '@/store/actions';
import { fetchRepoList, fetchBranches, fetchDirContent } from '@/store/thunks';
import State from '@/store/types';

interface Props {
    setDirData: (repo: string, branch: string, pathSlug: string[]) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => ({
    setDirData: (repo: string, branch: string, pathSlug: string[]) => {
        dispatch(fetchRepoList());
        dispatch(setRepo(repo));
        dispatch(setBranch(branch));
        dispatch(fetchDirContent(repo, branch, pathSlug));
        dispatch(fetchBranches(repo, pathSlug));
        dispatch(setPath(pathSlug));
        dispatch(setView(pathSlug[pathSlug.length - 1]));
    },
});

export const getServerSideProps = ({ params: { repoID, branch, pathSlug } }) => {
    const store = initializeStore();
    const { dispatch } = store;

    mapDispatchToProps(dispatch).setDirData(repoID, branch, pathSlug);

    const props = { initialReduxState: store.getState() };

    return { props: JSON.parse(JSON.stringify(props)) };
};

const DirPage = ({ setDirData }: Props) => {
    const router = useRouter();
    const { repoID, branch, pathSlug } = router.query;

    useEffect(() => {
        setDirData(repoID as string, branch as string, pathSlug as string[]);
    });

    return <Layout />;
};

export default connect(null, mapDispatchToProps)(DirPage);
