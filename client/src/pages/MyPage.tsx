import UserInfo from 'components/UserInfo';
import styled from 'styled-components';

export default function MyPage() {
  return (
    <MypageWrapper>
      <UserInfo />
    </MypageWrapper>
  );
}

const MypageWrapper = styled.div``;
