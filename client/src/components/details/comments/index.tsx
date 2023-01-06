import { useEffect } from 'react';
import { useQuery } from 'react-query';
import styled, { css } from 'styled-components';

import { getComments } from 'services/comments';
import { useSetRecoilState } from 'recoil';
import { contentIdState } from 'atom/user';

import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

interface IProps {
  contentId: string | undefined;
}

export default function Comments({ contentId }: IProps) {
  const setContentId = useSetRecoilState(contentIdState);
  const { data } = useQuery(['comments', contentId], () =>
    getComments(contentId),
  );

  useEffect(() => {
    if (contentId) setContentId(contentId);
  }, [contentId, setContentId]);

  return (
    <Wrapper length={data?.comments.length}>
      <h3>댓글</h3>
      {data?.comments
        .filter((item) => !item.responseTo)
        .map((item) => (
          <CommentItem
            key={item._id}
            commentItem={item}
            comments={data.comments}
          />
        ))}
      <CommentForm />
    </Wrapper>
  );
}

const Wrapper = styled.div<{ length: number | undefined }>`
  ${({ theme, length }) => css`
    margin-bottom: 3rem;
    h3 {
      font-size: 1rem;
      font-weight: 500;
      height: 30px;
      line-height: 30px;
      margin-bottom: 1.5rem;
      &::after {
        color: ${theme.colors.gray300};
        content: '(${length ? `${length}` : '0'})';
        font-size: 0.9rem;
        margin-left: 0.4em;
      }
    }
  `}
`;
