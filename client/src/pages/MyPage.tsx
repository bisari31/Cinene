import Categories from 'components/mypage/Categories';
import UserInfoHeader from 'components/mypage/UserInfoHeader';
import ValidateUser from 'components/mypage/ValidateUser';
import styled from 'styled-components';

export default function MyPage() {
  return (
    <MypageWrapper>
      <UserInfoHeader />
      <Categories />
      <ValidateUser />
    </MypageWrapper>
  );
}

const MypageWrapper = styled.div``;
