import styled from 'styled-components';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userIdState } from 'atom/user';
import { useAuthQuery } from 'hooks/useAuthQuery';
import { ChevronDown } from 'assets';
import useCheckedOutSide from 'hooks/useCheckedOutSide';
import SideMenu from 'components/header/SideMenu';
import { Link } from 'react-router-dom';

export default function AuthMenu() {
  const [userId, setUserId] = useRecoilState(userIdState);
  const { data } = useAuthQuery(userId);
  const { ref, visible, handleChangeVisible } = useCheckedOutSide();

  useEffect(() => {
    console.log('qwe');
  });

  useEffect(() => {
    const item = localStorage.getItem('auth');
    if (item) setUserId(item);
  }, []);

  return (
    <AuthFormWrapper>
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
