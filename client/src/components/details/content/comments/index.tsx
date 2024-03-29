import { useQuery } from 'react-query';
import styled, { css } from 'styled-components';
import { useRecoilValue } from 'recoil';

import { getComments } from 'services/comments';
import { contentIdState } from 'atom/atom';
import { cineneKeys } from 'utils/queryOptions';

import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

export default function Comments() {
  const contentId = useRecoilValue(contentIdState);
  const { data } = useQuery(cineneKeys.comments(contentId), () =>
    getComments(contentId),
  );

  return (
    <StyledWrapper length={data?.comments.length}>
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
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div<{ length?: number }>`
  ${({ theme, length }) => css`
    margin-bottom: 3rem;
    h3 {
      &::after {
        color: ${theme.colors.gray300};
        content: '(${length ? `${length}` : '0'})';
        font-size: 0.9rem;
        margin-left: 0.4em;
      }
    }
  `}
`;
