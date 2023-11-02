import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from "styled-components";

// _app.js 이전에 참조하는 기본 문서 파일
// 해당 구조가 _document의 기본 형태
export default class MyDocument extends Document {
    static async getInitialProps(ctx) { // _document, _app에서만 사용하는 특수한 SSR 메서드
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () => originalRenderPage({
                enhanceApp: (App) => (props) =>  sheet.collectStyles(<App {...props} />),
            });
            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } catch (error) {
            console.error(error);
        } finally {
            sheet.seal();
        }
    }
    render() {
        <Html>
            <Head />
            <body>
            <script src="https://polyfill.io/v3/polyfill.min.js?features=default%2Cdom4%2Ces2015%2Ces2016%2Ces2017%2Ces2018%2Ces2019%2Ces2020%2Ces2021%2Ces2022" />
            <Main />
                <NextScript />
            </body>
        </Html>
    }
}