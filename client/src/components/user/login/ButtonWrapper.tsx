import Button from 'components/common/Button';
import styled from 'styled-components';

import { PathName } from 'pages/LoginPage';

export default function ButtonWrapper({ type }: { type: PathName }) {
  return (
    <ButtonWrapperWrapper>
      <Button color="pink" size="fullWidth" type="submit">
        {type === 'login' ? '로그인' : '회원가입'}
      </Button>
      {type === 'login' && (
        <Button color="yellow" size="fullWidth" type="button" fontColor="black">
          카카오톡 로그인
        </Button>
      )}
    </ButtonWrapperWrapper>
  );
}

const ButtonWrapperWrapper = styled.div`
  & > button:nth-child(1) {
    margin-top: 3.5em;
  }
  & > button:nth-child(2) {
    margin-top: 1.5em;
  }
`;
