import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { getCurrentInfo } from '@/store/selectors';
import Logo from '../svg/logo.svg';
import RepoList from '../RepoList/RepoList';
import Footer from '../Footer/Footer';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import CurrentBar from '../CurrentBar/CurrentBar';
import Tabs from '../Tabs/Tabs';
import Table from '../Table/Table';
import Viewer from '../Viewer/Viewer';
import './Layout.scss';

interface Props {
    activeTab?: number;
    isError?: boolean;
    tableType?: 'files' | 'branches';
    type?: 'tree' | 'blob';
}

const Layout = ({ activeTab, isError, tableType, type }: Props) => {
    const { repo, branch } = useSelector(getCurrentInfo);

    return (
        <div className="Layout">
            <Head>
                <title>Yandex Arcanum</title>
                <link href="/favicon.ico" rel="shortcut icon" />
            </Head>
            <header className="Layout-Header">
                <Logo className="Layout-Logo" />
                <RepoList isError={isError} />
            </header>
            <div className="Layout-Content">
                {isError ? (
                    <div className="Layout-NotFound" data-testid="notFound">
                        404 Not Found
                    </div>
                ) : (
                    repo && (
                        <>
                            <BreadCrumbs />
                            <CurrentBar isBranches={tableType === 'branches'} type={type} />
                            {(branch || tableType === 'branches') && (
                                <>
                                    <Tabs activeTab={activeTab} type={type} />
                                    {type === 'tree' && <Table tableType={tableType} />}
                                    {type === 'blob' && <Viewer />}
                                </>
                            )}
                        </>
                    )
                )}
            </div>
            <Footer />
        </div>
    );
};

Layout.defaultProps = {
    activeTab: 0,
    isError: false,
    tableType: 'files',
    type: 'tree',
};

export default Layout;
