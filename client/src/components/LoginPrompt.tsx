import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from './common/Button';

export default function LoginPrompt() {
  const navigate = useNavigate();
  return (
    <StyledDiv>
      로그인이 필요한 서비스 입니다.
      <Button
        onClick={() => navigate('/login')}
        type="button"
        size="small"
        color="pink"
      >
        로그인
      </Button>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 1.1rem;
  font-weight: 400;
  height: ${({ theme }) => `calc(100vh - ${theme.config.header})`};
  justify-content: center;
  button {
    border-radius: 12px;
    height: 40px;
    margin-top: 3em;
    width: 150px;
  }
`;
