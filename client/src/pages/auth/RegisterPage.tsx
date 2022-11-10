import SignForm from 'components/SignForm';
import styled from 'styled-components';

export default function RegisterPage() {
  return (
    <RegisterPageWrapper>
      <SignForm type="register" />
    </RegisterPageWrapper>
  );
}

const RegisterPageWrapper = styled.div``;
