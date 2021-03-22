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
import { initializeStore } from '../../store/createStore';
import { setRepo, setView } from '../../store/actions';
import { fetchRepoList, fetchBranches } from '../../store/thunks';
import State from '../../store/types';

interface Props {
    setBranchData: (repo: string) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => ({
    setBranchData: (repo: string) => {
        dispatch(fetchRepoList());
        dispatch(setRepo(repo));
        dispatch(fetchBranches(repo));
        dispatch(setView(repo));
    },
});

export const getServerSideProps = ({ params: { repoID } }) => {
    const store = initializeStore();
    const { dispatch } = store;

    mapDispatchToProps(dispatch).setBranchData(repoID);

    const props = { initialReduxState: store.getState() };

    return { props: JSON.parse(JSON.stringify(props)) };
};

const BranchesPage = ({ setBranchData }: Props) => {
    const router = useRouter();
    const { repoID } = router.query;

    useEffect(() => {
        setBranchData(repoID as string);
    });

    return (
        <>
            <Head>
                <title>Yandex Arcanum</title>
            </Head>
            <Header />
            <BreadCrumbs />
            <Current noBranchList type="tree" />
            <Tabs activeTab={1} isRoot type="tree" />
            <Table tableType="branches" />
            <Footer />
        </>
    );
};

export default connect(null, mapDispatchToProps)(BranchesPage);
