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
import { initializeStore } from '../../../../store/createStore';
import { setRepo, setBranch, setPath, setView } from '../../../../store/actions';
import { fetchRepoList, fetchBranches, fetchDirContent } from '../../../../store/thunks';
import State from '../../../../store/types';

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

    return (
        <>
            <Head>
                <title>Yandex Arcanum</title>
            </Head>
            <Header />
            <BreadCrumbs />
            <Current type="tree" />
            <Tabs type="tree" />
            <Table tableType="files" />
            <Footer />
        </>
    );
};

export default connect(null, mapDispatchToProps)(DirPage);
