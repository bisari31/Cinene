import styled from 'styled-components';

import Tab from 'components/user/info/Tab';
import Profile from 'components/user/info/Profile';

export default function MyPage() {
  return (
    <MypageWrapper>
      <Profile>
        <Tab />
      </Profile>
    </MypageWrapper>
  );
}

const MypageWrapper = styled.div``;
