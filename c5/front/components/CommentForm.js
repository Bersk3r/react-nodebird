import React, {useCallback, useEffect} from 'react';
import {Button, Form, Input} from "antd";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import { ADD_COMMENT_REQUEST } from "../reducers/post";
const CommentForm = ({ post }) => {
    const dispatch = useDispatch();

    const id = useSelector((state) => state.user.me?.id);
    const { addCommentDone } = useSelector((state) => state.user);
    const [commentText, onChangeCommentText, setCommentText] = useInput('');

    useEffect(() => {
        if (addCommentDone) {
            setCommentText('');
        }
    }, [addCommentDone]);

    const onsubmitComment = useCallback(() => {
        console.log(post.id, commentText);
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: { content: commentText, postId: post.id, userId: id },
        });
    }, [commentText, id]);

    return (
        <Form onFinish={onsubmitComment}>
            <Form.Item style={{position: 'relative', margin: 0}}>
                <Input.TextArea value={commentText} onChange={onChangeCommentText} ></Input.TextArea>
                {/*<Button style={{ position: "absolute", right: 0, bottom: -40 }} type="primary" htmlType="submit">삐약</Button>*/}
                <Button style={{ position: "absolute", right: 0, bottom: -40, zIndex: 1 }} type="primary" htmlType="submit">삐약</Button>
            </Form.Item>
        </Form>
    );
}

CommentForm.propTypes = {
    post: PropTypes.object.isRequired,
}

export default CommentForm;