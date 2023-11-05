import { useRouter } from 'next/router';
import wrapper from "../../store/configureStore";
import axios from "axios";
import {LOAD_MY_INFO_REQUEST} from "../../reducers/user";
import {LOAD_POST_REQUEST} from "../../reducers/post";
import {END} from "redux-saga";
import AppLayout from "../../components/AppLayout";
import PostCard from "../../components/PostCard";
import {useSelector} from "react-redux";
import Head from "next/head";

const Post = () => {
    const router = useRouter();
    const { id } = router.query;
    const { singlePost } = useSelector((state) => state.post);

    // if (router.isFallback) { // CSR이 가능하게 하는 잠깐 기다리도록 하는 조건문
    //     return <div>로딩 중 ...</div>;
    // }

    return (
        <AppLayout>
            <Head>
                <title>
                    {singlePost.User.nickname}
                    님의 글
                </title>
                <meta name="description" content={singlePost.content} />
                <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
                <meta property="og:description" content={singlePost.content} />
                <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : 'https://nodebird.com/favicon.ico'} />
                <meta property="og:url" content={`https://nodebird.com/post/${id}`} />
            </Head>
            <PostCard post={singlePost} />
        </AppLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    console.log('getServerSideProps 시작');
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
        type: LOAD_POST_REQUEST,
        data: context.params.id,
    });
    context.store.dispatch(END);
    console.log('getServerSideProps 끝');
    await context.store.sagaTask.toPromise();
});

// getStaticPath 예시
// getStaticProps랑 같이 사용함
// 다이나믹 라우팅일 때 사용함
// 페이지 갯수에 제한이 있는 경우나 HTML로 만들어도 되는 경우에 사용
// 사용하면 서빙 속도가 빨라질 수 있음

// async function getStaticPaths() {
//     // const result = await axios.get('/post/list');
//     return {
//         paths: [
//             { params: { id: '1' } },
//             { params: { id: '2' } },
//             { params: { id: '3' } },
//         ],
//         fallback: true,
//         // false로 하면 존재하지 않는 페이지면 에러가 발생됨, true이면 에러가 발생되지 않으나 SSR은 안 됨
//         // Can't set headers already sent라는 에러메시지가 발생됨 -> next@9.4.5 이상에서 해결됨
//     };
//
// }
// export const getStaticProps = wrapper.getStaticProps(async (context) => {
//     console.log('getServerSideProps 시작');
//     const cookie = context.req ? context.req.headers.cookie : '';
//     axios.defaults.headers.Cookie = '';
//     if (context.req && cookie) {
//         axios.defaults.headers.Cookie = cookie;
//     }
//     context.store.dispatch({
//         type: LOAD_MY_INFO_REQUEST,
//     });
//     context.store.dispatch({
//         type: LOAD_POST_REQUEST,
//         data: context.params.id,
//     });
//     context.store.dispatch(END);
//     console.log('getServerSideProps 끝');
//     await context.store.sagaTask.toPromise();
// });


export default Post;