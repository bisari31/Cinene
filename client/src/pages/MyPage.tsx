import styled from 'styled-components';

import UserContainer from 'components/userPage/UserContainer';
import UserProfile from 'components/userPage/UserProfile';

export default function MyPage() {
  return (
    <MypageWrapper>
      <UserProfile>
        <UserContainer />
      </UserProfile>
    </MypageWrapper>
  );
}

const MypageWrapper = styled.div``;
