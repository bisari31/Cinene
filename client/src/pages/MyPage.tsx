import styled from 'styled-components';

import { useAuthQuery } from 'hooks/useAuthQuery';

import MenuWrapper from 'components/user/MenuWrapper';
import UserProfile from 'components/user/UserProfile';

export default function MyPage() {
  const { data } = useAuthQuery();
  return (
    <MypageWrapper>
      <UserProfile user={data?.user}>
        <MenuWrapper />
      </UserProfile>
    </MypageWrapper>
  );
}

const MypageWrapper = styled.div``;
