import React, { useCallback, useRef } from 'react';
// import React, { useState, useCallback, useMemo } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import useInput from "../hooks/useInput";
import { loginAction } from "../reducers/user";
import {useDispatch} from "react-redux";

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

// styled component 사용이 싫은 경우
// const style = useMemo(() => ({marginTop: 10}),[]);
// <div style={style} />
const LoginForm = () => {
    const dispatch = useDispatch();

    const [id, onChangeId] = useInput('zerocho@gmail.com');
    const [password, onChangePassword] = useInput('123123');

    const onSubmitForm = useCallback(() => {
        console.log(id, password);
        dispatch(loginAction({id, password}));
    }, [id, password]);

    ref.current.
    return (
        <>
            <FormWrapper onFinish={onSubmitForm}>
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <br />
                    <Input ref = {idRef} name="user-id" value={id} onChange={onChangeId} required />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br />
                    <Input
                        ref = {pwRef}
                        name="user-password"
                        type="password"
                        value={password}
                        onChange={onChangePassword}
                        required
                    />
                </div>
               <ButtonWrapper>
                    <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
                    <Link href="/signup"><a><Button>회원가입</Button></a></Link>
                </ButtonWrapper>
            </FormWrapper>
        </>
    );
}

export default LoginForm;