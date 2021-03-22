import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Layout from '@/components/Layout/Layout';
import { initializeStore } from '@/store/createStore';
import { setRepo, setBranch, setView } from '@/store/actions';
import { fetchRepoList, fetchBranches, fetchDirContent } from '@/store/thunks';
import State from '@/store/types';

interface Props {
    setRepoData: (repo: string, branch: string) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => ({
    setRepoData: (repo: string, branch: string) => {
        dispatch(fetchRepoList());
        dispatch(setRepo(repo));
        dispatch(fetchBranches(repo));
        dispatch(setBranch(branch));
        dispatch(fetchDirContent(repo, branch));
        dispatch(setView(repo));
    },
});

export const getServerSideProps = ({ params: { repoID, branch } }) => {
    const store = initializeStore();
    const { dispatch } = store;

    mapDispatchToProps(dispatch).setRepoData(repoID, branch);

    const props = { initialReduxState: store.getState() };

    return { props: JSON.parse(JSON.stringify(props)) };
};

const RootPage = ({ setRepoData }: Props) => {
    const router = useRouter();
    const { repoID, branch } = router.query;

    useEffect(() => {
        setRepoData(repoID as string, branch as string);
    });

    return <Layout isRoot />;
};

export default connect(null, mapDispatchToProps)(RootPage);
