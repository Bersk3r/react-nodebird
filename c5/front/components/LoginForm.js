import React, { useCallback, useRef } from 'react';
// import React, { useState, useCallback, useMemo } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import useInput from "../hooks/useInput";
import { loginRequestAction } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";

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
    const { logInLoading } = useSelector((state) => state.user);

    const emailRef = useRef();
    const pwRef = useRef();


    const [email, onChangeEmail] = useInput('zerocho@gmail.com');
    const [password, onChangePassword] = useInput('123123');

    const onSubmitForm = useCallback(() => {
        emailRef.current.focus();
        pwRef.current.focus();

        console.log(email, password);
        dispatch(loginRequestAction({email, password}));
    }, [email, password]);

    return (
        <>
            <FormWrapper onFinish={onSubmitForm}>
                <div>
                    <label htmlFor="user-email">이메일</label>
                    <br />
                    <Input ref={emailRef} name="user-email" type="email" value={email} onChange={onChangeEmail} required />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br />
                    <Input
                        ref={pwRef}
                        name="user-password"
                        type="password"
                        value={password}
                        onChange={onChangePassword}
                        required
                    />
                </div>
               <ButtonWrapper>
                    <Button type="primary" htmlType="submit" loading={logInLoading}>로그인</Button>
                    <Link href="/signup"><a><Button>회원가입</Button></a></Link>
                </ButtonWrapper>
            </FormWrapper>
        </>
    );
}

export default LoginForm;