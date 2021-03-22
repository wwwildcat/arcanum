import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { getCurrentInfo } from '@/store/selectors';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import Current from '../Current/Current';
import Tabs from '../Tabs/Tabs';
import Table from '../Table/Table';
import Viewer from '../Viewer/Viewer';

interface Props {
    activeTab?: number;
    tableType?: 'files' | 'branches';
    type?: 'tree' | 'blob';
}

const Layout = ({ activeTab, tableType, type }: Props) => {
    const { repo, branch } = useSelector(getCurrentInfo);

    return (
        <>
            <Head>
                <title>Yandex Arcanum</title>
                <link href="/favicon.ico" rel="shortcut icon" />
            </Head>
            <Header />
            {repo && (
                <>
                    <BreadCrumbs />
                    <Current isBranches={tableType === 'branches'} type={type} />
                    {(branch || tableType === 'branches') && (
                        <>
                            <Tabs activeTab={activeTab} type={type} />
                            {type === 'tree' && <Table tableType={tableType} />}
                            {type === 'blob' && <Viewer />}
                        </>
                    )}
                </>
            )}
            <Footer />
        </>
    );
};

Layout.defaultProps = {
    activeTab: 0,
    tableType: 'files',
    type: 'tree',
};

export default Layout;
