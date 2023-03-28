import { Star } from 'assets';
import { useMutation } from 'react-query';
import styled from 'styled-components';

import { deleteReview } from 'services/review';
import { USER_IMAGE } from 'utils/imageUrls';
import { cineneKeys } from 'utils/queryOptions';
import { useCurrentPathName, useGetRelativeTime } from 'hooks';
import { useAuth, useLoginPortal, useMutationOptions } from 'hooks/cinene';

import { StyledItem } from '../comments/CommentItemData';
import { StyledWrapper } from '../comments/CommentItem';

interface Props {
  onClick: () => void;
  review: Review;
}

export default function ReviewItem({ review, onClick }: Props) {
  const { author, comment, rating, createdAt, updatedAt, _id } = review;
  const { openPortal, renderPortal } = useLoginPortal();
  const { auth } = useAuth();
  const { id, path } = useCurrentPathName();
  const { errorHandler, queryClient } = useMutationOptions(openPortal);

  const { mutate: handleDeleteReview } = useMutation(deleteReview, {
    onSuccess: () => queryClient.invalidateQueries(cineneKeys.detail(path, id)),
    onError: (err: AxiosError) => errorHandler(err),
  });

  return (
    <StyledWrapper>
      <img src={author.img || USER_IMAGE} alt="user_avatar" />
      <StyledItem date={useGetRelativeTime(createdAt, updatedAt)}>
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
      </StyledItem>
      <StyledButtonWrapper>
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
      </StyledButtonWrapper>
      {renderPortal()}
    </StyledWrapper>
  );
}

const StyledButtonWrapper = styled.div`
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
