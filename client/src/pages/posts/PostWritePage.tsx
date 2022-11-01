import styled from 'styled-components';

import PostForm from 'components/posts/PostForm';

export default function PostWritePage() {
  return (
    <PostWritePageWrapper>
      <PostForm type="create" />
    </PostWritePageWrapper>
  );
}

const PostWritePageWrapper = styled.div``;
