import PostForm from 'components/posts/PostForm';
import styled from 'styled-components';

export default function PostDetailPage() {
  return (
    <PostDetailPageWrapper>
      <PostForm />
    </PostDetailPageWrapper>
  );
}

const PostDetailPageWrapper = styled.div``;
