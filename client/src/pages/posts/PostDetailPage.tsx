import { useQuery } from 'react-query';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getPost } from 'services/posts';

import PostForm from 'components/posts/PostForm';

export default function PostDetailPage() {
  const location = useLocation();
  const { id } = useParams();
  const { data, isLoading } = useQuery(['post', id], () => getPost(id));

  if (isLoading) return <div>loading....</div>;

  return (
    <PostDetailPageWrapper>
      {location.pathname.includes('modify') ? (
        <PostForm content={data} type="modify" />
      ) : (
        <PostForm content={data} type="view" />
      )}
    </PostDetailPageWrapper>
  );
}

const PostDetailPageWrapper = styled.div``;
