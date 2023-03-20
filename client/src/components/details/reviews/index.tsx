import styled, { css } from 'styled-components';
import { forwardRef } from 'react';
import { useQuery } from 'react-query';

import { getReviews } from 'services/review';
import { useAuthQuery, useOutsideClick } from 'hooks';
import { buttonEffect } from 'styles/css';

import Button from 'components/common/Button';
import { cineneKeys } from 'utils/keys';
import withLoginPortal from 'components/hoc/withLoginPortal';
import ReviewList from './ReviewList';
import ReviewModal from './ReviewModal';

interface Props {
  data?: CineneData;
  toggleLoginModal: () => void;
}

function Reviews(
  { data, toggleLoginModal }: Props,
  ref: React.ForwardedRef<HTMLHeadingElement>,
) {
  const { auth } = useAuthQuery();
  const {
    isMotionVisible,
    toggleModal,
    isVisible,
    ref: modalRef,
  } = useOutsideClick(300);

  const { data: reivewData } = useQuery(
    cineneKeys.reviews(data?.type, data?.tmdbId, !!auth),
    () => getReviews(data?._id, data?.type, auth?._id),
  );

  const handleClick = () => {
    if (auth) toggleModal();
    else toggleLoginModal();
  };

  return (
    <ReviewsWrapper length={reivewData?.reviews?.length}>
      <div>
        <h3 ref={ref}>리뷰</h3>
        {!reivewData?.hasReview && (
          <StyledButton
            onClick={handleClick}
            color="navy50"
            size="small"
            type="button"
          >
            리뷰 작성
          </StyledButton>
        )}
      </div>
      <ReviewList
        reviews={reivewData?.reviews}
        auth={auth}
        onClick={handleClick}
      />
      {isVisible && (
        <ReviewModal
          hasReview={reivewData?.hasReview}
          data={data}
          isMotionVisible={isMotionVisible}
          toggleModal={toggleModal}
          isVisible={isVisible}
          ref={modalRef}
        />
      )}
    </ReviewsWrapper>
  );
}

export default withLoginPortal<{ data?: CineneData }, HTMLHeadingElement>(
  forwardRef(Reviews),
);

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
