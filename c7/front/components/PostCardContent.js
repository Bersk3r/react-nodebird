import React, {useState, useCallback, useEffect} from 'react';
import PropTypes from "prop-types";
import {Button, Input} from 'antd';

import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {UPDATE_POST_REQUEST} from "../reducers/post";

const { TextArea } = Input;

const PostCardContent = ({postData, editMode, onChangePost, onCancelUpdate}) => {
    const { updatePostLoading, updatePostDone } = useSelector((state) => state.post);
    const [editText, setEditText] = useState(postData);
    const dispatch = useDispatch();

    useEffect(() => {
        if(updatePostDone) {
            onCancelUpdate();
        }
    }, [updatePostDone]);

    const onChangeText = useCallback((e) => {
        setEditText(e.target.value);
    }, []);

    return (
        <div>
            {editMode
                ? (
                    <>
                        <TextArea value={editText} onChange={onChangeText} />
                        <Button.Group>
                            <Button loading={updatePostLoading} onClick={onChangePost(editText)}>수정</Button>
                            <Button type="danger" onClick={onCancelUpdate}>삭제</Button>
                        </Button.Group>
                    </>
                )
                : postData.split(/(#[^\s#]+)/g).map((v,i) => {
                        if(v.match(/(#[^\s#]+)/)) {
                            return <Link href={`/hashtag/${v.slice(1)}`}  prefetch={false} key={i}><a>{v}</a></Link>
                        }
                        return v;
                })}
        </div>
    );
};

PostCardContent.propTypes = {
    postData: PropTypes.string.isRequired,
    editMode: PropTypes.bool,
    onCancelPost: PropTypes.func.isRequired,
    onCancelUpdate: PropTypes.func.isRequired,
};

PostCardContent.defaultProps = {
    editMode: false,
};

export default PostCardContent;