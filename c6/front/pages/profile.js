import React, {useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import { useSelector} from "react-redux";
import Router from "next/router";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import wrapper from "../store/configureStore";
import axios from "axios";
import {END} from "redux-saga";
import useSWR from 'swr';

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data);
// 주소를 가져올 방법을 정의한 함수

const Profile = () => {
    const { me } = useSelector((state) => state.user);
    const [ followersLimit, setFollowersLimit ] = useState(3);
    const [ followingsLimit, setFollowingsLimit ] = useState(3);

    const { data: followingsData, error: followingError } = useSWR(`http://localhost:3065/user/followings?limit=${followingsLimit}`, fetcher); // fetcher 대신 graphql도 사용 가능, 둘 다 없으면 로딩 중
    const { data: followersData, error: followerError } = useSWR(`http://localhost:3065/user/followers?limit=${followersLimit}`, fetcher); // fetcher 대신 graphql도 사용 가능, 둘 다 없으면 로딩 중


    useEffect(() => {
        if (!(me && me.id)) {
            Router.push('/');
        }
    }, [me && me.id]);

    const loadMoreFollowings = useCallback(() => {
        setFollowingsLimit((prev) => prev + 3);
    }, []);
    // useEffect에 followersData의 id로 비교한 후, 기존 state에 concat하면 데이터 낭비를 막을 수 있음

    const loadMoreFollowers = useCallback(() => {
        setFollowersLimit((prev) => prev + 3);
    }, []);

    if (!me) {
        return '내 정보 로딩 중 ...';
    }

    if (followerError || followingError) {
        console.error(followerError || followingError);
        return <div>팔로잉/팔로워 로딩 중 에러가 발생합니다.</div>;
    }

    return (
        <>
            <Head>
                <title>내 프로필 | NodeBird</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header="팔로잉" data={followingsData} onClickMore={loadMoreFollowings} loading={!followingsData && !followingError} />
                <FollowList header="팔로워" data={followersData} onClickMore={loadMoreFollowers} loading={!followersData && !followerError} />
            </AppLayout>
        </>
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
    context.store.dispatch(END);
    console.log('getServerSideProps 끝');
    await context.store.sagaTask.toPromise();
});

export default Profile;