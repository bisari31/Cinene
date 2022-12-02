import styled from 'styled-components';

import Popular from 'components/main/Popular';
import Sub from 'components/main/Sub';

export default function LandingPage() {
  return (
    <LandingPageWrapper>
      <Popular />
      <Sub />
    </LandingPageWrapper>
  );
}

const LandingPageWrapper = styled.div``;
