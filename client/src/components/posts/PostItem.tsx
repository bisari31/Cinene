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
  const changeCreatedAt = (date: string) => {
    const now = dayjs().format('YY:MM:DD');
    const d = dayjs(date);
    if (now === d.format('YY:MM:DD')) {
      return d.format('HH:mm');
    }
    return d.format('YYYY.MM.DD');
  };

  return (
    <PostItemWrapper>
      <Link to={`post/${post.numId}`}>
        <NumWrapper>{post.numId}</NumWrapper>
        <TitleWrapper>{post.title}</TitleWrapper>
        <NicknameWrapper>{post.writer.nickname}</NicknameWrapper>
        <DaysWrapper>{changeCreatedAt(post.createdAt)}</DaysWrapper>
        <ViewsWrapper>{post.views}</ViewsWrapper>
      </Link>
    </PostItemWrapper>
  );
}

const PostItemWrapper = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  a {
    padding: 1em 0.5em;
    display: flex;
    font-size: 15px;
  }
  div {
    display: flex;
  }
`;
