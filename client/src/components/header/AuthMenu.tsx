import styled, { css } from 'styled-components';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
import { lighten, darken } from 'polished';

import { userIdState } from 'atom/user';
import { useAuthQuery } from 'hooks/useAuthQuery';
import useClickedOutSide from 'hooks/useClickedOutSide';
import { logout } from 'services/auth';

import Modal from 'components/common/Portal';
import { Favorite } from 'assets';

export default function AuthMenu() {
  const [userId, setUserId] = useRecoilState(userIdState);
  const { data } = useAuthQuery(userId);
  const {
    ref: refElement,
    isVisible,
    animationState,
    changeVisibility,
  } = useClickedOutSide(300);

  const navigate = useNavigate();

  const handleLogout = () => {
    changeVisibility();
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
    <AuthMenuWrapper>
      <ul>
        {data?.isLoggedIn ? (
          <>
            <Icons>
              <Link to="/favorite">
                <Favorite />
              </Link>
            </Icons>
            <UserInfo>
              <Link to="/mypage">
                <img src={`/${data.user?.img}`} alt="user_image" />
              </Link>
            </UserInfo>
            <BtnMenu>
              <button type="button" onClick={changeVisibility}>
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
          <Modal
            color="purple"
            buttonText={['아니요', '로그아웃']}
            isVisible={animationState}
            refElement={refElement}
            closeFn={changeVisibility}
            executeFn={handleLogout}
          >
            정말 로그아웃 하시겠습니까? 😰
          </Modal>
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
      background-color: ${theme.colors.purple};
      border: none;
      border-radius: 12px;
      color: #fff;
      font-size: 12px;
      height: 35px;
      width: 90px;
      :hover {
        background-color: ${lighten(0.1, theme.colors.purple)};
      }
      :active {
        background-color: ${darken(0.1, theme.colors.purple)};
      }
    }
  `}
`;
const Icons = styled.li`
  a {
    svg {
      stroke: #fff;
      width: 22px;
    }
  }
`;

const UserInfo = styled.li`
  border-radius: 50%;
  margin-left: 1.7em;
  margin-right: 2.7em;
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
`;

const LoginMenu = styled.li`
  height: 35px;
  text-align: center;
  width: 90px;
  a {
    display: inline-block;
    height: 100%;
    line-height: 35px;
    width: 100%;
  }
`;
