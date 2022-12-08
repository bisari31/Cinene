import styled, { css, DefaultTheme } from 'styled-components';

type SiteName = 'TMDB' | 'Cinene';

interface Props {
  type: SiteName;
  average: number | undefined;
}

export default function AverageButton({ type, average }: Props) {
  const sliceAverage = (num: number | undefined) => {
    if (num) return num.toFixed(1);
    return 0;
  };

  return (
    <AverageWrapper type={type}>
      <p>
        {type} {sliceAverage(average)}
      </p>
    </AverageWrapper>
  );
}

const background = css<{ type: SiteName; theme: DefaultTheme }>`
  ${({ type, theme }) =>
    type === 'Cinene'
      ? css`
          background-color: ${theme.colors.purple};
          color: ${theme.colors.white};
        `
      : css`
          background: linear-gradient(
            77deg,
            rgba(137, 205, 164, 1) 0%,
            rgba(1, 179, 228, 1) 100%
          );
          color: ${theme.colors.black};
        `}
`;

const AverageWrapper = styled.div`
  margin-right: 1em;
  p {
    align-items: center;
    border-radius: 10.5px;
    display: flex;
    font-size: 0.8rem;
    font-weight: 500;
    height: 35px;
    justify-content: center;
    ${background};
    width: 80px;
  }
`;
