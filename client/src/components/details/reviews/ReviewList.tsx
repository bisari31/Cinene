import { memo } from 'react';
import styled from 'styled-components';

import ReviewItem from './ReviewItem';

function ReviewList({ reviews }: { reviews?: IReview[] }) {
  return (
    <ReviewListWrapper>
      {reviews?.map((review) => (
        <ReviewItem key={review._id} review={review} />
      ))}
    </ReviewListWrapper>
  );
}

export default memo(ReviewList);

const ReviewListWrapper = styled.ul``;
