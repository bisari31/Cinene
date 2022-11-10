import UserInfo from 'components/userInfo';
import ValidateUser from 'components/userInfo/ValidateUser';
import styled from 'styled-components';
import Categories from 'components/userInfo/Categories';

export default function MyPage() {
  return (
    <MypageWrapper>
      <UserInfo>
        <Categories />
        <article>
          <ValidateUser />
        </article>
      </UserInfo>
    </MypageWrapper>
  );
}

const MypageWrapper = styled.div``;
