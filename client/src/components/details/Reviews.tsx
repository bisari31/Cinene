import styled, { css } from 'styled-components';

export default function Reviews() {
  return (
    <ReviewsWrapper length={0}>
      <h3>리뷰</h3>
    </ReviewsWrapper>
  );
}

const ReviewsWrapper = styled.div<{ length: number }>`
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
