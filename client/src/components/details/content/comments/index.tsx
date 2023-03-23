import { useQuery } from 'react-query';
import styled, { css } from 'styled-components';
import { useRecoilValue } from 'recoil';

import { getComments } from 'services/comments';
import { cineneKeys } from 'utils/keys';
import { contentIdState } from 'atom/atom';

import withLoginPortal, {
  LoginPortalProps,
} from 'components/hoc/withLoginPortal';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

function Comments({ openModal }: LoginPortalProps) {
  const contentId = useRecoilValue(contentIdState);
  const { data } = useQuery(cineneKeys.comments(contentId), () =>
    getComments(contentId),
  );

  return (
    <Wrapper length={data?.comments.length}>
      <h3>댓글</h3>
      {data?.comments
        .filter((item) => !item.responseTo)
        .map((item) => (
          <CommentItem
            openModal={openModal}
            key={item._id}
            commentItem={item}
            comments={data.comments}
          />
        ))}
      <CommentForm openModal={openModal} />
    </Wrapper>
  );
}

export default withLoginPortal(Comments);

const Wrapper = styled.div<{ length?: number }>`
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
