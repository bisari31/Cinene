import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { lighten, darken } from 'polished';

import { Heart, Search } from 'assets';

import LogoutButton from 'components/common/LogoutButton';
import { USER_IMAGE } from 'utils/imageUrl';

interface Props {
  setIsVisible: () => void;
  data?: IAuthData;
}

export default function AuthMenu({ setIsVisible, data }: Props) {
  return (
    <AuthMenuWrapper>
      <ul>
        <Icons className="search_icon_wrapper">
          <button type="button" onClick={setIsVisible}>
            <Search className="search_icon" />
          </button>
        </Icons>
        <Icons className="favorites_icon_wrapper">
          <Link to="/favorites">
            <Heart className="favorites_icon" />
          </Link>
        </Icons>
        {data?.success ? (
          <>
            <UserInfo>
              <Link to="/mypage">
                <img src={data.user?.img || USER_IMAGE} alt="user_image" />
              </Link>
            </UserInfo>
            <BtnMenu className="logout_button">
              <LogoutButton />
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
    .search_icon_wrapper,
    .favorites_icon_wrapper {
      display: none;
    }
    @media ${({ theme }) => theme.device.tablet} {
      .logout_button,
      .search_icon_wrapper,
      .favorites_icon_wrapper {
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
  display: inline-flex;
  display: flex;
  height: 48px;
  width: 48px;
  a,
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  button {
    padding: 0;
    align-items: center;
    background: none;
    border: none;
    display: flex;
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
  width: 90px;
  a {
    display: inline-block;
    height: 100%;
    line-height: 35px;
    width: 100%;
  }
`;
