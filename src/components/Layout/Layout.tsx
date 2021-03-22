import React from 'react';
import Head from 'next/head';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import Current from '../Current/Current';
import Tabs from '../Tabs/Tabs';
import Table from '../Table/Table';
import Viewer from '../Viewer/Viewer';

interface Props {
    activeTab?: number;
    isRoot?: boolean;
    noBranchList?: boolean;
    noCurrentBranch?: boolean;
    noCurrentRepo?: boolean;
    tableType?: 'files' | 'branches';
    type?: 'tree' | 'blob';
}

const Layout = ({
    activeTab,
    isRoot,
    noBranchList,
    noCurrentBranch,
    noCurrentRepo,
    tableType,
    type,
}: Props) => (
    <>
        <Head>
            <title>Yandex Arcanum</title>
            <link href="/favicon.ico" rel="shortcut icon" />
        </Head>
        <Header noCurrentRepo={noCurrentRepo} />
        {!noCurrentRepo && (
            <>
                <BreadCrumbs />
                <Current
                    noBranchList={noBranchList}
                    noCurrentBranch={noCurrentBranch}
                    type={type}
                />
                {!noCurrentBranch && (
                    <>
                        <Tabs activeTab={activeTab} isRoot={isRoot} type={type} />
                        {type === 'tree' && <Table tableType={tableType} />}
                        {type === 'blob' && <Viewer />}
                    </>
                )}
            </>
        )}
        <Footer />
    </>
);

Layout.defaultProps = {
    activeTab: 0,
    isRoot: false,
    noBranchList: false,
    noCurrentBranch: false,
    noCurrentRepo: false,
    tableType: 'files',
    type: 'tree',
};

export default Layout;
