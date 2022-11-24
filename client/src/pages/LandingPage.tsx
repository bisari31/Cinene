import styled from 'styled-components';

import Popular from 'components/main/Popular';

export default function LandingPage() {
  return (
    <LandingPageWrapper>
      <h2>인기 작품</h2>
      <Popular />
    </LandingPageWrapper>
  );
}

const LandingPageWrapper = styled.div`
  h2 {
    font-size: 1.8rem;
    font-weight: 500;
    margin-bottom: 1em;
  }
`;
