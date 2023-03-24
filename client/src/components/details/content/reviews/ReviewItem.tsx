import { Star } from 'assets';
import useGetRelativeTime from 'hooks/useRelativeTime';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';

import { deleteReview } from 'services/review';
import { USER_IMAGE } from 'utils/imageUrl';
import { cineneKeys } from 'utils/queryOptions';

import { useCurrentPathName } from 'hooks';
import useAuthQuery from 'components/header/hooks/useAuthQuery';
import useLoginPortal from 'hooks/useLoginPortal';
import { Content, Item } from '../comments/CommentItem';

interface Props {
  onClick: () => void;
  review: Review;
}

export default function ReviewItem({ review, onClick }: Props) {
  const { author, comment, rating, createdAt, updatedAt, _id } = review;
  const { openModal, renderPortal } = useLoginPortal();
  const { auth, setAuth } = useAuthQuery();
  const { id, path } = useCurrentPathName();
  const queryClient = useQueryClient();

  const { mutate: handleDeleteReview } = useMutation(deleteReview, {
    onSuccess: () => queryClient.invalidateQueries(cineneKeys.detail(path, id)),
    onError: ({ response }: AxiosError) => {
      if (response.status === 401) {
        setAuth(null);
        openModal();
      } else {
        openModal(`${response.data.message} 😭`);
      }
    },
  });

  return (
    <Item>
      <img src={author.img || USER_IMAGE} alt="user_avatar" />
      <Content date={useGetRelativeTime(createdAt, updatedAt)}>
        <div>
          <p>{author.nickname}</p>
          {author._id === auth?._id && (
            <>
              <button type="button" onClick={onClick}>
                수정
              </button>
              <button type="button" onClick={() => handleDeleteReview(_id)}>
                삭제
              </button>
            </>
          )}
        </div>
        <p>{comment}</p>
      </Content>
      <SvgWrapper>
        {[1, 2, 3, 4, 5].map((star) => (
          <StyledButton
            isFilling={star <= rating}
            key={star}
            type="button"
            disabled
          >
            <Star />
          </StyledButton>
        ))}
      </SvgWrapper>
      {renderPortal()}
    </Item>
  );
}

const SvgWrapper = styled.div`
  align-items: center;
  display: flex;
`;

const StyledButton = styled.button<{ isFilling: boolean }>`
  background: none;
  border: none;
  padding: 0;
  width: 18px;
  &:hover {
    cursor: auto;
  }
  svg {
    fill: ${({ theme, isFilling }) =>
      isFilling ? theme.colors.yellow : theme.colors.navy};
    height: 100%;
    stroke: none;
    width: 100%;
  }
`;
