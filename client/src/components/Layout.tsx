import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { userIdState } from 'atom/user';
import { logout } from 'services/auth';
import { useAuthQuery } from 'hooks/useAuthQuery';

export default function Layout() {
  const [userId, setUserId] = useRecoilState(userIdState);
  const { data } = useAuthQuery(userId);

  const onClickLogout = () => {
    logout().then(() => {
      setUserId('');
      localStorage.removeItem('auth');
    });
  };

  useEffect(() => {
    const item = localStorage.getItem('auth');
    if (item) setUserId(item);
    console.log('이게 실행되나요?');
  }, []);

  return (
    <LayoutWrapper>
      <header>
        <LogoWrapper>
          <h1>
            <Link to="/">LOGO</Link>
          </h1>
        </LogoWrapper>
        <SideBar>
          <ul>
            {!data?.user && (
              <>
                <li>
                  <Link to="/login">로그인</Link>
                </li>
                <li>
                  <Link to="/register">회원가입</Link>
                </li>
              </>
            )}
            {data?.user && (
              <>
                <li>
                  <Link to="/">
                    <b>{data.user.nickname}</b>님 안녕하세요.
                  </Link>
                </li>
                <li>
                  <button onClick={onClickLogout} type="button">
                    로그아웃
                  </button>
                </li>
              </>
            )}
          </ul>
        </SideBar>
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
  }
  main {
    margin-top: ${({ theme }) => theme.config.main_margin_top};
    padding: ${({ theme }) => theme.config.padding};
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  flex: 1;
  h1 {
    font-size: 20px;
    font-weight: 700;
  }
`;

const SideBar = styled.div`
  align-items: center;
  display: flex;
  ul {
    align-items: center;
    color: ${({ theme }) => theme.colors.black};
    display: flex;
    flex: 1;

    li {
      font-size: 13px;
      b {
        font-weight: 600;
        margin-right: 0.2em;
      }
    }
    li + li {
      margin-left: 2em;
    }
    button {
      background-color: ${({ theme }) => theme.colors.gray500};
      border: none;
      border-radius: ${({ theme }) => theme.config.border2};
      color: #fff;
      height: 30px;
      width: 80px;
      &:hover {
        background-color: ${({ theme }) => theme.colors.black};
      }
    }
  }
`;
