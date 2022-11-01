import { useQuery } from 'react-query';
import { getPosts } from 'services/posts';
import styled from 'styled-components';
import PostItem from './PostItem';

export default function PostList() {
  const { data } = useQuery(['posts'], getPosts);

  console.log(data);
  return (
    <PostListWrapper>
      <ul>
        <ListHeader>
          <NumWrapper>글 번호</NumWrapper>
          <TitleWrapper>제목</TitleWrapper>
          <NicknameWrapper>닉네임</NicknameWrapper>
          <DaysWrapper>작성일</DaysWrapper>
          <ViewsWrapper>조회수</ViewsWrapper>
        </ListHeader>
        {data?.map((item) => (
          <PostItem key={item._id} post={item} />
        ))}
      </ul>
    </PostListWrapper>
  );
}

const PostListWrapper = styled.div``;

const ListHeader = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  display: flex;
  font-size: 14px;
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
