import styled, { css } from 'styled-components';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
import { lighten, darken } from 'polished';

import { userIdState } from 'atom/user';
import { useAuthQuery } from 'hooks/useAuthQuery';
import useOutsideClick from 'hooks/useOutsideClick';
import { logout } from 'services/auth';

import { Favorite, Search } from 'assets';
import Portal from 'components/common/Portal';
import Modal from 'components/common/Modal';

interface Props {
  setIsVisible: () => void;
}

export default function AuthMenu({ setIsVisible }: Props) {
  const setUserId = useSetRecoilState(userIdState);
  const { data } = useAuthQuery();
  const {
    ref: refElement,
    isVisible,
    animationState,
    handleChangeVisibility,
  } = useOutsideClick(300);

  // const navigate = useNavigate();

  const handleLogout = () => {
    handleChangeVisibility();
    logout().then(() => {
      localStorage.removeItem('userId');
      setUserId('');
    });
  };

  useEffect(() => {
    const item = localStorage.getItem('userId');
    if (item) {
      setUserId(item);
    }
  }, [setUserId]);

  return (
    <AuthMenuWrapper>
      <ul>
        <Icons className="search_icon_wrapper">
          <button type="button" onClick={setIsVisible}>
            <Search className="search_icon" />
          </button>
        </Icons>
        {data?.success ? (
          <>
            <Icons>
              <Link to="/favorite">
                <Favorite className="favorite_icon" />
              </Link>
            </Icons>
            <UserInfo>
              <Link to="/mypage">
                <img
                  src="https://blog.kakaocdn.net/dn/b8Kdun/btqCqM43uim/1sWJVkjEEy4LJMfR3mcqxK/img.jpg"
                  alt="user_image"
                />
              </Link>
            </UserInfo>
            <BtnMenu className="logout_button">
              <button type="button" onClick={handleChangeVisibility}>
                로그아웃
              </button>
            </BtnMenu>
          </>
        ) : (
          <>
            <LoginMenu>
              <Link to="/login">로그인</Link>
            </LoginMenu>
            <BtnMenu>
              <Link to="/register">회원가입</Link>
            </BtnMenu>
          </>
        )}

        {isVisible && (
          <Portal>
            <Modal
              color="pink"
              buttonText={['아니요', '로그아웃']}
              isVisible={animationState}
              refElement={refElement}
              closeFn={handleChangeVisibility}
              executeFn={handleLogout}
            >
              정말 로그아웃 하시겠습니까? 😰
            </Modal>
          </Portal>
        )}
      </ul>
    </AuthMenuWrapper>
  );
}

const AuthMenuWrapper = styled.div`
  ul {
    align-items: center;
    display: flex;
    li {
      font-size: 12px;
    }

    .logout_button,
    .search_icon_wrapper {
      display: none;
    }
    @media ${({ theme }) => theme.device.tablet} {
      .logout_button,
      .search_icon_wrapper {
        display: flex;
      }
    }
  }
`;

const BtnMenu = styled.li`
  ${({ theme }) => css`
    a {
      display: inline-block;
      text-align: center;
      line-height: 35px;
    }
    a,
    button {
      background: ${theme.colors.pink};
      border: none;
      border-radius: 12px;
      color: #fff;
      font-size: 12px;
      height: 35px;
      width: 90px;
      :hover {
        background-color: ${lighten(0.1, theme.colors.pink)};
      }
      :active {
        background-color: ${darken(0.1, theme.colors.pink)};
      }
    }
  `}
`;
const Icons = styled.li`
  align-items: center;
  display: flex;
  button {
    border: none;
    align-items: center;
    display: flex;
    background: none;
    padding: 1em;
  }
  .search_icon {
    fill: #fff;
    stroke-width: 0.1;
  }
  svg {
    stroke: #fff;
    stroke-width: 1.5;
    width: 22px;
  }
  & + & {
    margin-left: 1em;
  }
`;

const UserInfo = styled.li`
  border-radius: 50%;
  margin-left: 1.7em;
  /* margin-right: 2.7em; */
  overflow: hidden;
  a {
    border-radius: inherit;
    img {
      border-radius: inherit;
      height: 35px;
      object-fit: cover;
      width: 35px;
    }
  }
  &:hover {
    cursor: pointer;
  }
  @media ${({ theme }) => theme.device.tablet} {
    margin-right: 2.7em;
  }
`;

const LoginMenu = styled.li`
  height: 35px;
  text-align: center;
  width: 70px;
  a {
    display: inline-block;
    height: 100%;
    line-height: 35px;
    width: 100%;
  }
`;
