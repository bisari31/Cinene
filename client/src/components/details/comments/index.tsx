import { useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { getComments } from 'services/comments';
import CommentWrapper from './CommentWrapper';

import CommentItem from './CommentItem';
import Form from './CommentForm';

interface IProps {
  contentId?: string;
}

export default function Comment({ contentId }: IProps) {
  const { data: commentsData } = useQuery(['comments', contentId], () =>
    getComments(contentId),
  );

  return (
    <Wrapper commtentsLength={commentsData?.comments?.length}>
      <h3>댓글</h3>
      <ItemWrapper hasData={!!commentsData?.comments?.length}>
        {commentsData?.comments?.map((comment) => (
          <CommentWrapper
            key={comment._id}
            contentId={contentId}
            comment={comment}
          />
        ))}
      </ItemWrapper>
      <Form contentId={contentId} />
    </Wrapper>
  );
}

const Wrapper = styled.div<{ commtentsLength: number | undefined }>`
  margin-bottom: 4rem;
  h3 {
    &::after {
      content: ' (${({ commtentsLength }) => commtentsLength ?? '정보 없음'})';
      font-size: 0.9rem;
    }
    display: inline-block;
    font-size: 1rem;
    font-weight: 500;
    height: 30px;
    line-height: 30px;
    margin-bottom: 1.5rem;
  }
`;

const ItemWrapper = styled.div<{ hasData: boolean }>`
  margin-bottom: ${({ hasData }) => (hasData ? '2em' : '')};
`;
