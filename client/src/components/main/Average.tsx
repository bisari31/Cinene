import styled, { css } from 'styled-components';

import { Star } from 'assets';

interface IProps {
  cinene?: ICineneData | null;
  tmdb?: number;
  isMedia?: boolean;
}

export default function Average({ tmdb, cinene, isMedia = true }: IProps) {
  const sliceAverage = (num: number | undefined) => {
    if (num) return num.toFixed(1);
    return 0;
  };

  return (
    <AverageWrapper>
      <div>
        <Star />
        <span>
          <b>{cinene?.average?.toFixed(1) ?? 0} </b> / {cinene?.votes ?? 0}
        </span>
      </div>
      {isMedia && (
        <div>
          <span>TMDB {sliceAverage(tmdb)}</span>
        </div>
      )}
    </AverageWrapper>
  );
}

const AverageWrapper = styled.div`
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
