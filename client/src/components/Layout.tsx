import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { userIdState } from 'atom/user';
import { useAuthQuery } from 'hooks/useAuthQuery';
import { ChevronDown } from 'assets';
import useCheckedOutSide from 'hooks/useCheckedOutSide';
import SideMenu from './SideMenu';

export default function Layout() {
  const [userId, setUserId] = useRecoilState(userIdState);
  const { data } = useAuthQuery(userId);
  const { ref, visible, handleChangeVisible } = useCheckedOutSide();
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
              <UserInfoList onClick={handleChangeVisible} showMemu={visible}>
                <img src={`/${data?.user.img}`} alt="user_image" />
                <span>{data?.user.nickname}</span>
                <ChevronDown />
                {visible && <SideMenu refElement={ref} />}
              </UserInfoList>
            ) : (
              <>
                <LayoutList>
                  <Link to="/login">로그인</Link>
                </LayoutList>
                <LayoutList>
                  <Link to="/register">회원가입</Link>
                </LayoutList>
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
      align-items: center;
      display: flex;
      font-size: 13px;
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

const LayoutList = styled.li`
  &:last-child {
    margin-left: 2em;
  }
`;
