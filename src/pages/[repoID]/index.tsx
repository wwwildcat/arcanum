import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Layout from '@/components/Layout/Layout';
import { initializeStore } from '@/store/createStore';
import { setView, setRepo } from '@/store/actions';
import { fetchRepoList, fetchBranches } from '@/store/thunks';
import State from '@/store/types';

interface Props {
    setRepoData: (repo: string) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => ({
    setRepoData: (repo: string) => {
        dispatch(fetchRepoList());
        dispatch(setRepo(repo));
        dispatch(fetchBranches(repo));
        dispatch(setView(repo));
    },
});

export const getServerSideProps = ({ params: { repoID } }) => {
    const store = initializeStore();
    const { dispatch } = store;

    mapDispatchToProps(dispatch).setRepoData(repoID);

    const props = { initialReduxState: store.getState() };

    return { props: JSON.parse(JSON.stringify(props)) };
};

const RepoPage = ({ setRepoData }: Props) => {
    const router = useRouter();
    const { repoID } = router.query;

    useEffect(() => {
        setRepoData(repoID as string);
    });

    return <Layout noCurrentBranch />;
};

export default connect(null, mapDispatchToProps)(RepoPage);
