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
import { setBranch, setView, setPath, setRepo } from '../../store/actions';
import { fetchBranches } from '../../store/thunks';
import State from '../../store/types';

interface Props {
    setRepoData: (repo: string) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => ({
    setRepoData: (repo: string) => {
        dispatch(setRepo(repo));
        dispatch(fetchBranches(repo));
        dispatch(setBranch(''));
        dispatch(setPath([]));
        dispatch(setView(repo));
    },
});

const RepoPage = ({ setRepoData }: Props) => {
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
            <BreadCrumbs />
            <Current noBranch type="tree" />
            <Footer />
        </>
    );
};

export default connect(null, mapDispatchToProps)(RepoPage);
