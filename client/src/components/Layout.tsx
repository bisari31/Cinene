import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { userIdState } from 'atom/user';
import { useAuthQuery } from 'hooks/useAuthQuery';
import { ChevronDown } from 'assets';
import SideMenu from './SideMenu';

export default function Layout() {
  const [showMemu, setShowMenu] = useState(false);
  const [userId, setUserId] = useRecoilState(userIdState);
  const { data } = useAuthQuery(userId);

  const handleShowInfo = () => {
    setShowMenu(!showMemu);
  };

  useEffect(() => {
    const item = localStorage.getItem('auth');
    if (item) setUserId(item);
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
            {data?.user ? (
              <UserInfoList onClick={handleShowInfo} showMemu={showMemu}>
                <img src={`/${data?.user.img}`} alt="user_image" />
                <span>{data?.user.nickname}</span>
                <ChevronDown />
                {showMemu && <SideMenu />}
              </UserInfoList>
            ) : (
              <>
                <li>
                  <Link to="/login">로그인</Link>
                </li>
                <li>
                  <Link to="/register">회원가입</Link>
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
      display: flex;
      align-items: center;
    }
    li + li {
      margin-left: 2em;
    }
  }
`;

const UserInfoList = styled.li<{ showMemu: boolean }>`
  position: relative;
  img {
    object-fit: cover;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  svg {
    transform: ${({ showMemu }) =>
      showMemu ? `rotate(180deg)` : `rotate(0deg)`};
    transition: 0.5s ease;
    stroke: ${({ theme }) => theme.colors.black};
    stroke-width: 2.5;
    width: 14px;
  }
  span {
    font-weight: 500;
    margin-left: 1em;
    margin-right: 0.8em;
  }
  &:hover {
    cursor: pointer;
  }
`;
