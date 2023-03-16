import { memo } from 'react';
import styled from 'styled-components';

import ReviewItem from './ReviewItem';

interface Props {
  onClick: () => void;
  reviews?: Review[];
  auth: User | null;
}

function ReviewList({ reviews, auth, onClick }: Props) {
  return (
    <ReviewListWrapper>
      {reviews?.map((review) => (
        <ReviewItem
          key={review._id}
          review={review}
          auth={auth}
          onClick={onClick}
        />
      ))}
    </ReviewListWrapper>
  );
}

export default memo(ReviewList);

const ReviewListWrapper = styled.ul``;
