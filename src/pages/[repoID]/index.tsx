import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import Current from '../../components/Current/Current';
import Tabs from '../../components/Tabs/Tabs';
import Table from '../../components/Table/Table';
import { setView, setPath, setRepo } from '../../store/actions';
import { fetchDirContent } from '../../store/thunks';
import State from '../../store/types';

interface Props {
    isLoading: boolean;
    setRepoData: (repo: string) => void;
}

const mapStateToProps = (state: State) => ({
    isLoading: state.isLoading,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => ({
    setRepoData: (repo: string) => {
        dispatch(setRepo(repo));
        dispatch(fetchDirContent(repo));
        dispatch(setPath([]));
        dispatch(setView(repo));
    },
});

const RepoPage = ({ isLoading, setRepoData }: Props) => {
    const router = useRouter();
    const { repoID } = router.query;

    useEffect(() => {
        setRepoData(repoID as string);
    });

    return (
        <>
            <Head>
                <title>Yandex Arcanum</title>
            </Head>
            <Header />
            {!isLoading && (
                <>
                    <BreadCrumbs />
                    <Current />
                    <Tabs type="tree" />
                    <Table content="files" />
                </>
            )}
            <Footer />
        </>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(RepoPage);
