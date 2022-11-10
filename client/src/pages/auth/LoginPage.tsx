import SignForm from 'components/SignForm';
import styled from 'styled-components';

export default function LoginPage() {
  return (
    <LoginPageWrapper>
      <SignForm type="login" />
    </LoginPageWrapper>
  );
}

const LoginPageWrapper = styled.div``;
