import styled, { css } from 'styled-components';

export default function Sub() {
  return (
    <SubWrapper>
      <div>qwewqewqe</div>
    </SubWrapper>
  );
}

const SubWrapper = styled.section`
  ${({ theme }) => css`
    background-color: ${theme.colors.navy};
    height: 100vh;
    left: 0;
    position: absolute;
    right: 0;
    top: 100vh;
    div {
      margin: 0 auto;
      max-width: 1280px;
      padding: ${theme.config.padding};
      position: relative;
      width: 100%;
    }
  `};
`;
