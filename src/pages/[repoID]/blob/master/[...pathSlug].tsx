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
import Viewer from '../../../../components/Viewer/Viewer';
import { setRepo, setPath, setView } from '../../../../store/actions';
import { fetchFileContent } from '../../../../store/thunks';
import State from '../../../../store/types';

interface Props {
    setFileData: (repo: string, pathSlug: string[]) => void;
}

const mapStateToProps = (state: State) => ({
    isLoading: state.isLoading,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => ({
    setFileData: (repo: string, pathSlug: string[]) => {
        const pathToFile = pathSlug || [];
        const fileName = pathSlug ? pathSlug[pathSlug.length - 1] : '';

        dispatch(setRepo(repo));
        dispatch(fetchFileContent(repo, pathToFile));
        dispatch(setPath(pathToFile));
        dispatch(setView(fileName));
    },
});

const RepoPage = ({ setFileData }: Props) => {
    const router = useRouter();
    const { repoID, pathSlug } = router.query;

    useEffect(() => {
        setFileData(repoID as string, pathSlug as string[]);
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
                <Tabs type="blob" />
                <Viewer />
            </>
            <Footer />
        </>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(RepoPage);
