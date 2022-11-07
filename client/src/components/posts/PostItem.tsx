import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { changeCreatedAt } from 'utils';

import {
  DaysWrapper,
  NicknameWrapper,
  NumWrapper,
  TitleWrapper,
  ViewsWrapper,
} from './PostList';

interface IProps {
  post: IPost;
}

export default function PostItem({ post }: IProps) {
  return (
    <PostItemWrapper commentsNum={post.commentsNum}>
      <NumWrapper>{post.numId}</NumWrapper>
      <TitleWrapper>
        <Link to={`post/${post._id}`}>
          {post.title}
          {!!post.commentsNum && <em>[{post.commentsNum}]</em>}
        </Link>
      </TitleWrapper>
      <NicknameWrapper>{post.writer.nickname}</NicknameWrapper>
      <DaysWrapper>{changeCreatedAt(post.createdAt)}</DaysWrapper>
      <ViewsWrapper>{post.views}</ViewsWrapper>
    </PostItemWrapper>
  );
}

const PostItemWrapper = styled.li<{ commentsNum: number }>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  display: flex;
  padding: 1em 0.5em;
  div {
    display: flex;
  }
  a {
    em {
      color: ${({ theme }) => theme.colors.red};
      font-size: 12px;
      margin-left: 0.5em;
    }
  }
`;
