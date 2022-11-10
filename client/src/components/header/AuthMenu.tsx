import styled, { css } from 'styled-components';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
import { lighten, darken } from 'polished';

import { userIdState } from 'atom/user';
import { useAuthQuery } from 'hooks/useAuthQuery';
import useCheckedOutSide from 'hooks/useCheckedOutSide';
import { ChevronDown } from 'assets';
import { logout } from 'services/auth';

import SideMenu from 'components/header/SideMenu';
import CustomPortal from 'components/common/Portal';

export default function AuthMenu() {
  const [userId, setUserId] = useRecoilState(userIdState);
  const { data } = useAuthQuery(userId);
  const { ref, visible, handleChangeVisible } = useCheckedOutSide();
  const {
    ref: logoutRef,
    visible: visibleLogout,
    animationState: logoutState,
    handleChangeVisible: handleVisibleLogout,
  } = useCheckedOutSide(300);

  const navigate = useNavigate();

  const handleLogout = () => {
    handleVisibleLogout();
    logout().then(() => {
      localStorage.removeItem('auth');
      setUserId('');
      navigate('/');
    });
  };

  useEffect(() => {
    const item = localStorage.getItem('auth');
    if (item) setUserId(item);
  }, []);

  return (
    <AuthFormWrapper>
      <SideBar>
        <ul>
          {data?.isLoggedIn ? (
            <UserInfoList onClick={handleChangeVisible} showMemu={visible}>
              <img src={`/${data?.user.img}`} alt="user_image" />
              <span>{data?.user.nickname}</span>
              <ChevronDown />
              {visible && (
                <SideMenu onClick={handleVisibleLogout} refElement={ref} />
              )}
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
      {visibleLogout && (
        <CustomPortal
          color="black"
          buttonText={['아니요', '로그아웃']}
          visible={logoutState}
          refElement={logoutRef}
          closeFn={handleVisibleLogout}
          executeFn={handleLogout}
        >
          정말 로그아웃 하시겠습니까? 😰
        </CustomPortal>
      )}
    </AuthFormWrapper>
  );
}

const AuthFormWrapper = styled.div``;
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
  ${({ theme, showMemu }) => css`
    display: flex;
    position: relative;
    img {
      border-radius: 50%;
      height: 40px;
      object-fit: cover;
      width: 40px;
    }
    svg {
      stroke: ${theme.colors.black};
      stroke-width: 2.5;
      transform: ${showMemu ? `rotate(180deg)` : `rotate(0deg)`};
      transition: 0.5s ease;
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
  `}
`;

const LayoutList = styled.li`
  ${({ theme }) => css`
    border-radius: 7px;
    height: 35px;
    justify-content: center;
    width: 90px;
    &:last-child {
      background-color: ${theme.colors.black};
      color: #fff;
      margin-left: 0.5em;
      :hover {
        background-color: ${lighten(0.1, theme.colors.black)};
      }
      :active {
        background-color: ${darken(0.1, theme.colors.black)};
      }
    }
    a {
      align-items: center;
      display: flex;
      font-size: 12px;
      font-weight: 400;
      height: 100%;
      justify-content: center;
      width: 100%;
    }
  `}
`;
