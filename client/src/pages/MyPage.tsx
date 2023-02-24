import styled from 'styled-components';

import { useAuthQuery } from 'hooks/useAuthQuery';

import Tab from 'components/user/info/Tab';
import Profile from 'components/user/info/Profile';

export default function MyPage() {
  const { data } = useAuthQuery();

  return (
    <MypageWrapper>
      <Profile user={data?.user}>
        <Tab />
      </Profile>
    </MypageWrapper>
  );
}

const MypageWrapper = styled.div``;
