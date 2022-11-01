import UserForm from 'components/UserForm';
import styled from 'styled-components';

export default function LoginPage() {
  return (
    <LoginPageWrapper>
      <UserForm type="login" />
    </LoginPageWrapper>
  );
}

const LoginPageWrapper = styled.div``;
