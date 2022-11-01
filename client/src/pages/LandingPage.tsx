import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import PostList from 'components/posts/PostList';

export default function LandingPage() {
  const navigate = useNavigate();

  const onClickPostUpload = () => {
    navigate('/post/write');
  };

  return (
    <LandingPageWrapper>
      <PostList />
      <BtnWrapper>
        <button type="button" onClick={onClickPostUpload}>
          글쓰기
        </button>
      </BtnWrapper>
    </LandingPageWrapper>
  );
}

const LandingPageWrapper = styled.div`
  button {
    background-color: ${({ theme }) => theme.colors.black};
    border: none;
    border-radius: ${({ theme }) => theme.config.border};
    color: #fff;
    height: 35px;
    width: 80px;
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2em;
`;
