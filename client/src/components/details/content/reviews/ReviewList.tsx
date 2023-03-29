import { memo } from 'react';

import ReviewItem from './ReviewItem';

interface Props {
  onClick: () => void;
  reviews?: Review[];
}

function ReviewList({ reviews, ...rest }: Props) {
  return (
    <ul>
      {reviews?.map((review) => (
        <ReviewItem key={review._id} review={review} {...rest} />
      ))}
    </ul>
  );
}

export default memo(ReviewList);
