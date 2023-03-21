import { memo } from 'react';
import styled from 'styled-components';

import ReviewItem from './ReviewItem';

interface Props {
  onClick: () => void;
  reviews?: Review[];
  toggleLoginModal: () => void;
}

function ReviewList({ reviews, ...rest }: Props) {
  return (
    <ReviewListWrapper>
      {reviews?.map((review) => (
        <ReviewItem key={review._id} review={review} {...rest} />
      ))}
    </ReviewListWrapper>
  );
}

export default memo(ReviewList);

const ReviewListWrapper = styled.ul``;
