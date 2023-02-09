import styled, { css } from 'styled-components';
import { forwardRef, useEffect } from 'react';
import { useQuery } from 'react-query';

import useOutsideClick from 'hooks/useOutsideClick';
import { useAuthQuery } from 'hooks/useAuthQuery';
import { getReviews } from 'services/rating';

import ReviewHeader from './ReviewHeader';
import ReviewModal from './ReviewModal';
import ReviewItem from './ReviewItem';

export interface IReviewProps {
  data: IFavoritesContents | undefined;
}

function Reviews(
  { data }: IReviewProps,
  ref: React.ForwardedRef<HTMLHeadingElement>,
) {
  const {
    animationState,
    changeVisibility,
    isVisible,
    ref: modalRef,
  } = useOutsideClick(300);

  const { data: authData } = useAuthQuery();

  const { data: reivewData } = useQuery(
    ['reviews', data?.type, data?._id],
    () => getReviews(data?._id, data?.type, authData?.user?._id),
    {
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    console.log('🚀 ~ file: index.tsx:31 ~ reivew', reivewData);
  }, [reivewData]);

  return (
    <ReviewsWrapper length={data?.count}>
      <h3 ref={ref}>리뷰</h3>
      <ReviewHeader
        hasReview={reivewData?.hasReview}
        changeVisibility={changeVisibility}
        data={authData}
      />
      <ul>
        {reivewData?.documents?.map((review) => (
          <ReviewItem key={review._id} review={review} />
        ))}
      </ul>
      {isVisible && (
        <ReviewModal
          hasReview={reivewData?.hasReview}
          data={data}
          animationState={animationState}
          changeVisibility={changeVisibility}
          isVisible={isVisible}
          ref={modalRef}
        />
      )}
    </ReviewsWrapper>
  );
}

export default forwardRef(Reviews);

const ReviewsWrapper = styled.div<{ length: number | undefined }>`
  ${({ theme, length }) => css`
    margin-bottom: 4em;
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
