import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import useInput from "../hooks/useInput";
import UserProfile from '../components/UserProfile';
import LoginForm from '../components/LoginForm';
import Router from "next/router";

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

// gutter로 인한 스크롤바 생성 문제 해결
const Global = createGlobalStyle`
    .ant-row {
      margin-right: 0 !important;
      margin-left: 0 !important;
    }

    .ant-col:first-child {
      padding-left: 0 !important;
    }

    .ant-col:last-child {
      padding-left: 0 !important;
    }
`;

const AppLayout = ({ children }) => {
    const [ searchInput, onChangeSearchInput ] = useInput('');
    const { me } = useSelector((state) => state.user);

    const onSearch = useCallback(() => {
        Router.push(`/hashtag/${searchInput}`);
    },[searchInput]);

    return (
        <div>
            <Global />
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/"><a>노드버드</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile"><a>프로필</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <SearchInput
                        enterButton
                        value={searchInput}
                        onChange={onChangeSearchInput}
                        onSearch={onSearch}
                    />
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup"><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {me ? <UserProfile /> : <LoginForm />}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <a href="https://mkbird.net" target="_blank" rel="noreferrer noopener">Made by MockingBird</a>
                </Col>
            </Row>
        </div>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired, // children은 node라는 타입임 (react의 node 타입)
}

export default AppLayout;
