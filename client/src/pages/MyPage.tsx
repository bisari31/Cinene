import styled from 'styled-components';

import Tab from 'components/user/profile/Tab';
import Profile from 'components/user/profile';
import { useRedirection } from 'hooks';

export default function MyPage() {
  useRedirection(true);

  return (
    <MypageWrapper>
      <Profile>
        <Tab />
      </Profile>
    </MypageWrapper>
  );
}

const MypageWrapper = styled.div``;
