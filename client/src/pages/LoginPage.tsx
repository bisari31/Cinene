import Form from 'components/Form';
import styled from 'styled-components';

export default function LoginPage() {
  return (
    <LoginPageWrapper>
      <Form type="login" />
    </LoginPageWrapper>
  );
}

const LoginPageWrapper = styled.div``;
