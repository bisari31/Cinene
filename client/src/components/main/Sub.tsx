import styled, { css } from 'styled-components';

import TopRated from './topRated/index';
import Upcomming from './Upcomming';

export default function Sub() {
  return (
    <SubWrapper>
      <Upcomming type="now" />
      <Upcomming type="upcoming" />
      <TopRated type="cinene" />
      <TopRated type="tmdb" />
    </SubWrapper>
  );
}

const SubWrapper = styled.section`
  ${({ theme }) => css`
    background-color: ${theme.colors.navy};
    left: 0;
    margin-top: 1em;
    position: absolute;
    right: 0;
    top: 100vh;
    & > div {
      h3 {
        font-size: 1.3rem;
        margin-bottom: 1.5em;
      }
      margin: 0 auto;
      max-width: 1280px;
      padding: ${theme.config.padding};
      width: 100%;
      & > div {
        right: 0;
      }
    }
  `};
`;
