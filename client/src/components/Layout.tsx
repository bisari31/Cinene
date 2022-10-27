import axios from 'axios';
import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from './SearchBar';

export default function Layout() {
  const onClickLogout = async () => {
    const { data } = await axios.get('/auth/logout');
    console.log(data);
  };

  useEffect(() => {
    const isLoggedIn = async () => {
      const { data } = await axios.get('/auth');
      console.log(data);
    };
    isLoggedIn();
  }, []);
  return (
    <LayoutWrapper>
      <header>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/login">로그인</Link>
          </li>
          <li>
            <Link to="/register">회원가입</Link>
          </li>
          <li>
            <button onClick={onClickLogout} type="button">
              로그아웃
            </button>
          </li>
        </ul>
        <SearchBar />
      </header>
      <main>
        <Outlet />
      </main>
    </LayoutWrapper>
  );
}

const LayoutWrapper = styled.div`
  header {
    align-items: center;
    display: flex;
    height: ${({ theme }) => theme.config.header};
    padding: ${({ theme }) => theme.config.padding};

    ul {
      font-size: 14px;
      align-items: center;
      color: ${({ theme }) => theme.colors.black};
      display: flex;
      flex: 1;
      li + li {
        margin-left: 2em;
      }
    }
  }
  main {
    padding: ${({ theme }) => theme.config.padding};
  }
`;
