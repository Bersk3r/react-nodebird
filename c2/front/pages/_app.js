import React from 'react';
import 'antd/dist/antd.css';
import Head from 'next/head';
import PropTypes from "prop-types";
const NodeBird = ({ Component }) => {
    return (
        <>
            <Head>
                <meta charset="utf-8" />
                <title>NodeBird</title>
            </Head>
            <Component />
        </>
    );
}

NodeBird.propTypes = {
    Component: PropTypes.elementType.isRequired,
}
export default NodeBird;