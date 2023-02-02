import styled, { css } from 'styled-components';
import { forwardRef } from 'react';

import { IContent } from 'services/contents';

interface IProps {
  data: IContent | undefined | null;
}

function Reviews(
  { data }: IProps,
  ref: React.ForwardedRef<HTMLHeadingElement>,
) {
  return (
    <ReviewsWrapper length={data?.count}>
      <h3 ref={ref}>리뷰</h3>
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
