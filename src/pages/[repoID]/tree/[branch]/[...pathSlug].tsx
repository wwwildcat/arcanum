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
import { setRepo, setBranch, setPath, setView } from '../../../../store/actions';
import { fetchBranches, fetchDirContent } from '../../../../store/thunks';
import State from '../../../../store/types';

interface Props {
    setDirData: (repo: string, branch: string, pathSlug: string[]) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => ({
    setDirData: (repo: string, branch: string, pathSlug: string[]) => {
        const pathToDir = pathSlug || [];
        const dirName = pathSlug ? pathSlug[pathSlug.length - 1] : '';

        dispatch(setRepo(repo));
        dispatch(setBranch(branch));
        dispatch(fetchDirContent(repo, branch, pathToDir));
        dispatch(fetchBranches(repo, pathToDir));
        dispatch(setPath(pathToDir));
        dispatch(setView(dirName));
    },
});

const DirPage = ({ setDirData }: Props) => {
    const router = useRouter();
    const { repoID, branch, pathSlug } = router.query;

    useEffect(() => {
        setDirData(repoID as string, branch as string, pathSlug as string[]);
    });

    return (
        <>
            <Head>
                <title>Yandex Arcanum</title>
            </Head>
            <Header />
            <>
                <BreadCrumbs />
                <Current type="tree" />
                <Tabs type="tree" />
                <Table tableType="files" />
            </>
            <Footer />
        </>
    );
};

export default connect(null, mapDispatchToProps)(DirPage);
