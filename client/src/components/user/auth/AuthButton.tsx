import Button from 'components/common/Button';
import styled from 'styled-components';

import { KAKAO_URI } from 'utils/urls';
import { AuthPagePathName } from 'pages/AuthPage';

export default function AuthButton({ type }: { type: AuthPagePathName }) {
  const handleClick = () => {
    window.location.href = KAKAO_URI;
  };

  return (
    <StyledWrapper>
      <Button color="pink" size="fullWidth" type="submit">
        {type === 'login' ? '로그인' : '회원가입'}
      </Button>
      {type === 'login' && (
        <Button
          color="yellow"
          size="fullWidth"
          type="button"
          fontColor="black"
          onClick={handleClick}
        >
          카카오톡 로그인
        </Button>
      )}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  & > button:nth-child(1) {
    margin-top: 3.5em;
  }
  & > button:nth-child(2) {
    margin-top: 1.5em;
  }
`;
