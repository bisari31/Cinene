import styled from 'styled-components';

import { useAuthQuery } from 'hooks/useAuthQuery';

import Menu from 'components/user/info/Menu';
import UserProfile from 'components/user/UserProfile';

export default function MyPage() {
  const { data } = useAuthQuery();
  return (
    <MypageWrapper>
      <UserProfile user={data?.user}>
        <Menu />
      </UserProfile>
    </MypageWrapper>
  );
}

const MypageWrapper = styled.div``;
