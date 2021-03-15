import React from 'react';
import Head from 'next/head';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const HomePage = (): JSX.Element => (
    <>
        <Head>
            <title>Yandex Arcanum</title>
        </Head>
        <Header />
        <Footer />
    </>
);

export default HomePage;
