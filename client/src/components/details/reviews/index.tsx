import styled, { css } from 'styled-components';
import { forwardRef } from 'react';
import { useQuery } from 'react-query';

import { getReviews } from 'services/review';
import { useAuthQuery, useOutsideClick } from 'hooks';
import { buttonEffect } from 'styles/css';

import Button from 'components/common/Button';
import ReviewModal from './ReviewModal';
import ReviewList from './ReviewList';

export interface IReviewProps {
  data: ICineneData | undefined;
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
  );

  const handleClick = () => {
    if (authData?.success) changeVisibility();
  };

  return (
    <ReviewsWrapper length={data?.votes}>
      <div>
        <h3 ref={ref}>리뷰</h3>
        <StyledButton
          onClick={handleClick}
          color="navy50"
          size="small"
          type="button"
        >
          {reivewData?.hasReview ? '리뷰 수정' : '리뷰 작성'}
        </StyledButton>
      </div>
      <ReviewList reviews={reivewData?.reviews} />
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
    & > div:first-child {
      align-items: center;
      display: flex;
      height: 30px;
      margin-bottom: 24px;

      h3 {
        margin-bottom: 0;
        margin-right: 1em;
        &::after {
          color: ${theme.colors.gray300};
          content: '(${length ? `${length}` : '0'})';
          font-size: 0.9rem;
          margin-left: 0.4em;
        }
      }
    }
  `}
`;

const StyledButton = styled(Button)`
  border-radius: 10px;
  font-size: 0.75rem;
  height: 100%;
  width: 70px;
  ${buttonEffect};
`;
