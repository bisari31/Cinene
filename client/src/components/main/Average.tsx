import styled, { css } from 'styled-components';

import { Star } from 'assets';

interface Props {
  cineneData?: CineneData;
  tmdbAverage?: number;
  isMedia?: boolean;
}

export default function Average({
  tmdbAverage,
  cineneData,
  isMedia = false,
}: Props) {
  const sliceAverage = (num?: number) => (num ? num.toFixed(1) : 0);
  const average = sliceAverage(tmdbAverage);

  return (
    <StyledWrapper>
      <div>
        <Star />
        <span>
          <b>{cineneData?.average.toFixed(1) ?? 0} </b> /{' '}
          {cineneData?.votes ?? 0}
        </span>
      </div>
      {isMedia && (
        <div>
          <span>TMDB {average}</span>
        </div>
      )}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  ${({ theme }) => css`
    align-items: center;
    display: flex;
    div:first-child {
      align-items: center;
      color: ${theme.colors.white};
      display: flex;
      span {
        color: ${theme.colors.gray300};
        margin-right: 1em;
        font-size: 0.8rem;
        b {
          color: ${theme.colors.white};
          font-size: 1.8rem;
          font-weight: 450;
        }
      }
      svg {
        fill: ${theme.colors.yellow};
        height: 25px;
        margin-right: 0.4em;
        stroke: ${theme.colors.yellow};
        width: 25px;
      }
    }
    div:nth-of-type(2) {
      margin-right: 1em;
      span {
        align-items: center;
        background: linear-gradient(
          77deg,
          rgba(137, 205, 164, 1) 0%,
          rgba(1, 179, 228, 1) 100%
        );
        border-radius: 10.5px;
        color: ${theme.colors.black};
        display: flex;
        font-size: 0.8rem;
        font-weight: 450;
        height: 25px;
        justify-content: center;
        width: 80px;
      }
    }
  `}
`;
