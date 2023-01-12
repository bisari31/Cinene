import { IContent } from 'services/contents';
import styled, { css } from 'styled-components';

interface IProps {
  data: IContent | undefined | null;
}

export default function Reviews({ data }: IProps) {
  return (
    <ReviewsWrapper length={data?.count}>
      <h3>리뷰</h3>
    </ReviewsWrapper>
  );
}

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
