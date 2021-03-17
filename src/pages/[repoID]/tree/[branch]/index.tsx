import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Header from '../../../../components/Header/Header';
import Footer from '../../../../components/Footer/Footer';
import BreadCrumbs from '../../../../components/BreadCrumbs/BreadCrumbs';
import Current from '../../../../components/Current/Current';
import Tabs from '../../../../components/Tabs/Tabs';
import Table from '../../../../components/Table/Table';
import { setRepo, setBranch, setView, setPath } from '../../../../store/actions';
import { fetchBranches, fetchDirContent } from '../../../../store/thunks';
import State from '../../../../store/types';

interface Props {
    currentBranch: string;
    setRepoData: (repo: string, branch: string) => void;
}

const mapStateToProps = (state: State) => ({
    currentBranch: state.currentBranch,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => ({
    setRepoData: (repo: string, branch: string) => {
        dispatch(setRepo(repo));
        dispatch(fetchBranches(repo));
        dispatch(setBranch(branch));
        dispatch(fetchDirContent(repo, branch));
        dispatch(setPath([]));
        dispatch(setView(repo));
    },
});

const RootPage = ({ currentBranch, setRepoData }: Props) => {
    const router = useRouter();
    const { repoID, branch } = router.query;

    useEffect(() => {
        setRepoData(repoID as string, branch as string);
    });

    return (
        <>
            <Head>
                <title>Yandex Arcanum</title>
            </Head>
            <Header />
            <BreadCrumbs />
            <Current type="tree" />
            {currentBranch && (
                <>
                    <Tabs type="tree" />
                    <Table content="files" />
                </>
            )}
            <Footer />
        </>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(RootPage);
