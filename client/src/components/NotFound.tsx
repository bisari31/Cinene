import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { buttonEffect } from 'styles/css';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <StyledWrapper color="pink">
      잘못된 접근
      <button type="button" onClick={() => navigate(-1)}>
        돌아가기
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  font-weight: 500;
  height: 100vh;
  justify-content: center;
  button {
    background-color: ${({ theme }) => theme.colors.pink};
    border: none;
    border-radius: 12px;
    color: #fff;
    height: 40px;
    margin-top: 3rem;
    width: 150px;
    ${buttonEffect};
  }
`;
