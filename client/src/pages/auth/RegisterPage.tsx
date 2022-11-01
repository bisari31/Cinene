import UserForm from 'components/UserForm';
import styled from 'styled-components';

export default function RegisterPage() {
  return (
    <RegisterPageWrapper>
      <UserForm type="register" />
    </RegisterPageWrapper>
  );
}

const RegisterPageWrapper = styled.div``;
