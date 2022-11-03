import { Link } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';

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
  const changeCreatedAt = (date?: string) => {
    const now = dayjs().format('YYMMDD');
    const d = dayjs(date);
    if (now === d.format('YYMMDD')) {
      return d.format('HH:mm');
    }
    return d.format('YYYY.MM.DD');
  };
  return (
    <PostItemWrapper>
      <NumWrapper>{post.numId}</NumWrapper>
      <TitleWrapper>
        <Link to={`post/${post.numId}`}>{post.title}</Link>
      </TitleWrapper>
      <NicknameWrapper>{post.writer.nickname}</NicknameWrapper>
      <DaysWrapper>{changeCreatedAt(post.createdAt)}</DaysWrapper>
      <ViewsWrapper>{post.views}</ViewsWrapper>
    </PostItemWrapper>
  );
}

const PostItemWrapper = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};

  display: flex;
  padding: 1em 0.5em;
  div {
    display: flex;
  }
`;
