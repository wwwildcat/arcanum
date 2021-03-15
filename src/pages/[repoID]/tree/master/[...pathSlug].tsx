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
import { setRepo, setPath, setView } from '../../../../store/actions';
import { fetchDirContent } from '../../../../store/thunks';
import State from '../../../../store/types';

interface Props {
    setDirData: (repo: string, pathSlug: string[]) => void;
}

const mapStateToProps = (state: State) => ({
    isLoading: state.isLoading,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => ({
    setDirData: (repo: string, pathSlug: string[]) => {
        const pathToDir = pathSlug ? pathSlug.join('/') : '';
        const dirName = pathSlug ? pathSlug.reverse()[0] : '';

        dispatch(setRepo(repo));
        dispatch(fetchDirContent(repo, pathToDir));
        dispatch(setPath(pathToDir));
        dispatch(setView(dirName));
    },
});

const RepoPage = ({ setDirData }: Props) => {
    const router = useRouter();
    const { repoID, pathSlug } = router.query;

    useEffect(() => {
        setDirData(repoID as string, pathSlug as string[]);
    });

    return (
        <>
            <Head>
                <title>Yandex Arcanum</title>
            </Head>
            <Header />
            <>
                <BreadCrumbs />
                <Current />
                <Tabs type="tree" />
                <Table content="files" />
            </>
            <Footer />
        </>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(RepoPage);
