import styled, { css } from 'styled-components';
import { forwardRef } from 'react';

import useOutsideClick from 'hooks/useOutsideClick';
import ReviewItem from './ReviewItem';
import ReviewModal from './ReviewModal';

export interface IProps {
  data: IFavoritesContents | undefined;
}

function Reviews(
  { data }: IProps,
  ref: React.ForwardedRef<HTMLHeadingElement>,
) {
  const {
    animationState,
    changeVisibility,
    isVisible,
    ref: modalRef,
  } = useOutsideClick(300);

  return (
    <ReviewsWrapper length={data?.count}>
      <h3 ref={ref}>리뷰</h3>
      <ReviewItem changeVisibility={changeVisibility} />
      {isVisible && (
        <ReviewModal
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
