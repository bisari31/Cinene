import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAuthQuery } from 'hooks/useAuthQuery';

import Button from 'components/common/Button';
import PostList from 'components/posts/PostList';

export default function PostPage() {
  const { data } = useAuthQuery();
  const navigate = useNavigate();

  const onClickPostUpload = () => {
    navigate('./write');
  };
  return (
    <PostPageWrapper>
      <PostList />
      <div>
        <Button
          color="black"
          isDisabled={!data?.isLoggedIn}
          size="small"
          type="button"
          onClick={onClickPostUpload}
        >
          글쓰기
        </Button>
      </div>
    </PostPageWrapper>
  );
}

const PostPageWrapper = styled.div`
  & > div:last-child {
    display: flex;
    justify-content: flex-end;
    margin-top: 2em;
  }
`;
