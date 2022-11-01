import { useQuery } from 'react-query';
import styled from 'styled-components';

import { getPosts } from 'services/posts';

import PostItem from './PostItem';

export default function PostList() {
  const { data } = useQuery(['posts'], getPosts);

  return (
    <PostListWrapper>
      <ul>
        <StyeldList>
          <NumWrapper>번호</NumWrapper>
          <TitleWrapper>제목</TitleWrapper>
          <NicknameWrapper>닉네임</NicknameWrapper>
          <DaysWrapper>작성일</DaysWrapper>
          <ViewsWrapper>조회수</ViewsWrapper>
        </StyeldList>
        {data?.map((item) => (
          <PostItem key={item._id} post={item} />
        ))}
      </ul>
    </PostListWrapper>
  );
}

const PostListWrapper = styled.div`
  ul {
    font-size: 14px;
  }
`;

export const StyeldList = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  display: flex;
  font-weight: 500;
  padding: 1em 0.5em;
  div {
    display: flex;
  }
`;
export const NumWrapper = styled.div`
  flex-basis: 50px;
`;
export const TitleWrapper = styled.div`
  flex: 1;
`;
export const NicknameWrapper = styled.div`
  flex-basis: 100px;
`;
export const DaysWrapper = styled.div`
  flex-basis: 100px;
  justify-content: center;
`;
export const ViewsWrapper = styled.div`
  flex-basis: 50px;
  justify-content: center;
`;
