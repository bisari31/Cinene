import styled from 'styled-components';

import { useAuthQuery } from 'hooks/useAuthQuery';

import Tab from 'components/user/info/Tab';
import UserProfile from 'components/user/UserProfile';

export default function MyPage() {
  const { data } = useAuthQuery();
  return (
    <MypageWrapper>
      <UserProfile user={data?.user}>
        <Tab />
      </UserProfile>
    </MypageWrapper>
  );
}

const MypageWrapper = styled.div``;
