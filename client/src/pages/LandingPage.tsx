import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import PostList from 'components/posts/PostList';
import { useAuthQuery } from 'hooks/useAuthQuery';
import Button from 'components/common/Button';

export default function LandingPage() {
  const { data } = useAuthQuery();
  const navigate = useNavigate();

  const onClickPostUpload = () => {
    navigate('/post/write');
  };

  return (
    <LandingPageWrapper>
      <PostList />
      <BtnWrapper>
        <Button
          color="black"
          disable={!data?.isLoggedIn}
          size="small"
          type="button"
          onClick={onClickPostUpload}
          // isLoggedIn={data?.isLoggedIn}
          // type="button"
          // onClick={onClickPostUpload}
          // disabled={!data?.isLoggedIn}
        >
          글쓰기
        </Button>
        {/* <Button
          isLoggedIn={data?.isLoggedIn}
          type="button"
          onClick={onClickPostUpload}
          disabled={!data?.isLoggedIn}
        >
          글쓰기
        </Button> */}
      </BtnWrapper>
    </LandingPageWrapper>
  );
}

const LandingPageWrapper = styled.div``;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2em;
`;

// const Button = styled.button<{ isLoggedIn: boolean | undefined }>`
//   background-color: ${({ theme, isLoggedIn }) =>
//     isLoggedIn ? theme.colors.black : theme.colors.gray500};
//   border: none;
//   border-radius: ${({ theme }) => theme.config.border};
//   color: #fff;
//   height: 35px;
//   width: 80px;
//   &:hover {
//     cursor: ${({ isLoggedIn }) => (isLoggedIn ? 'pointer' : 'not-allowed')};
//   }
// `;
