import { Star } from 'assets';
import useGetRelativeTime from 'hooks/useRelativeTime';
import styled from 'styled-components';

import { USER_IMAGE } from 'utils/imageUrl';
import { Item } from '../comments/CommentItem';

export default function ReviewItem({ review }: { review: IReview }) {
  const { createdAt, updatedAt } = review;

  return (
    <Item date={useGetRelativeTime(createdAt, updatedAt)}>
      <img src={USER_IMAGE} alt="user_avatar" />
      <div>
        <p>{review.userId.nickname}</p>
        <p>{review.comment}</p>
      </div>
      <SvgWrapper>
        {[1, 2, 3, 4, 5].map((star) => (
          <StyledButton
            isFilling={star <= review.rating}
            key={star}
            type="button"
            disabled
          >
            <Star />
          </StyledButton>
        ))}
      </SvgWrapper>
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
