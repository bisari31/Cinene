import styled, { css } from 'styled-components';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
import { lighten, darken } from 'polished';

import { userIdState } from 'atom/user';
import { useAuthQuery } from 'hooks/useAuthQuery';
import useClickedOutSide from 'hooks/useClickedOutSide';
import { ChevronDown } from 'assets';
import { logout } from 'services/auth';

import SideMenu from 'components/header/SideMenu';
import Modal from 'components/common/Portal';

export default function AuthMenu() {
  const [userId, setUserId] = useRecoilState(userIdState);
  const { data } = useAuthQuery(userId);
  const { ref, isVisible, changeVisibility } = useClickedOutSide();
  const {
    ref: logoutRef,
    isVisible: isVisibleLogoutForm,
    animationState: logoutState,
    changeVisibility: changeVisibilityModal,
  } = useClickedOutSide(300);

  const navigate = useNavigate();

  const handleLogout = () => {
    changeVisibilityModal();
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
            <UserInfoList onClick={changeVisibility} showMemu={isVisible}>
              <img src={`/${data.user?.img}`} alt="user_image" />
              <span>{data.user?.nickname}</span>
              <ChevronDown />
              {isVisible && (
                <SideMenu onClick={changeVisibilityModal} refElement={ref} />
              )}
            </UserInfoList>
          ) : (
            <>
              <SignMenu>
                <Link to="/login">로그인</Link>
              </SignMenu>
              <SignMenu>
                <Link to="/register">회원가입</Link>
              </SignMenu>
            </>
          )}
        </ul>
      </SideBar>
      {isVisibleLogoutForm && (
        <Modal
          color="black"
          buttonText={['아니요', '로그아웃']}
          isVisible={logoutState}
          refElement={logoutRef}
          closeFn={changeVisibilityModal}
          executeFn={handleLogout}
        >
          정말 로그아웃 하시겠습니까? 😰
        </Modal>
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
  ${({ showMemu }) => css`
    display: flex;
    position: relative;
    img {
      border-radius: 50%;
      height: 40px;
      object-fit: cover;
      width: 40px;
    }
    svg {
      stroke: #fff;
      stroke-width: 2.5;
      transform: ${showMemu ? `rotate(180deg)` : `rotate(0deg)`};
      transition: 0.5s ease;
      width: 14px;
    }
    span {
      color: #fff;
      font-weight: 500;
      margin-left: 1em;
      margin-right: 0.8em;
    }
    &:hover {
      cursor: pointer;
    }
  `}
`;

const SignMenu = styled.li`
  ${({ theme }) => css`
    border-radius: 17.5px;
    color: #fff;
    height: 35px;
    justify-content: center;
    width: 90px;
    &:last-child {
      background-color: ${theme.colors.purple};
      color: #fff;
      margin-left: 0.5em;
      :hover {
        background-color: ${lighten(0.1, theme.colors.purple)};
      }
      :active {
        background-color: ${darken(0.1, theme.colors.purple)};
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
