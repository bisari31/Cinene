import { LoginPortalProps } from 'components/hoc/withLoginPortal';
import { memo } from 'react';
import styled from 'styled-components';

import ReviewItem from './ReviewItem';

interface Props extends LoginPortalProps {
  onClick: () => void;
  reviews?: Review[];
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
