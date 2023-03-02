import { memo } from 'react';
import styled from 'styled-components';

import ReviewItem from './ReviewItem';

interface IProps {
  onClick: () => void;
  reviews?: IReview[];
  auth?: IUser;
}

function ReviewList({ reviews, auth, onClick }: IProps) {
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
