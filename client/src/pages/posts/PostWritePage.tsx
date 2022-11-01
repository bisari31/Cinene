import PostForm from 'components/posts/PostForm';
import styled from 'styled-components';

export default function PostWritePage() {
  return (
    <PostWritePageWrapper>
      <PostForm />
    </PostWritePageWrapper>
  );
}

const PostWritePageWrapper = styled.div``;
