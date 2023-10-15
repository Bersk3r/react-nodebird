import React, {useEffect} from 'react';
import AppLayout from "../components/AppLayout";
import {useDispatch, useSelector} from "react-redux";

import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import {LOAD_POSTS_REQUEST} from "../reducers/post";
// import {func} from "prop-types";
const Home = () => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);

    useEffect(() => {
        dispatch({
            type: LOAD_POSTS_REQUEST,
        });
    }, []);

    useEffect(() => {
        function onScroll() {
            // console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
            // scrollY: 얼마나 내렸는지, clientHeight : 화면이 보이는 길이, scrollHeight: 총 길이
            if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                if(hasMorePosts && !loadPostsLoading) {
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                    });
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    },[hasMorePosts, loadPostsLoading]);

    return (
        <AppLayout>
            { me && <PostForm /> }
            { mainPosts.map((post) => <PostCard key={post.id} post={post} />) }
        </AppLayout>
    );
};

export default Home;