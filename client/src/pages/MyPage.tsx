import styled from 'styled-components';

import MenuWrapper from 'components/UserPage/MenuWrapper';
import UserProfile from 'components/UserPage/UserProfile';

export default function MyPage() {
  return (
    <MypageWrapper>
      <UserProfile>
        <MenuWrapper />
      </UserProfile>
    </MypageWrapper>
  );
}

const MypageWrapper = styled.div``;
