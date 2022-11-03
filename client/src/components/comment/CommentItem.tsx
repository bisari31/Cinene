import styled from 'styled-components';
import { IComment } from 'types/comment';

interface IProps {
  data: IComment;
}

export default function CommentItem({ data }: IProps) {
  return <CommentItemWrapper>{data.comment}</CommentItemWrapper>;
}

const CommentItemWrapper = styled.li``;
