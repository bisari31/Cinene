import { darken, lighten } from 'polished';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <NotFoundWrapper>
      잘못된 접근
      <button type="button" onClick={() => navigate(-1)}>
        돌아가기
      </button>
    </NotFoundWrapper>
  );
}

const NotFoundWrapper = styled.div`
  ${({ theme }) => css`
    align-items: center;
    display: flex;
    flex-direction: column;
    font-size: 2rem;
    font-weight: 500;
    height: 100vh;
    justify-content: center;
    button {
      background-color: ${theme.colors.pink};
      border: none;
      border-radius: 12px;
      color: #fff;
      height: 40px;
      margin-top: 3rem;
      width: 150px;
      &:hover {
        background-color: ${lighten(0.1, theme.colors.pink)};
      }
      &:active {
        background-color: ${darken(0.1, theme.colors.pink)};
      }
    }
  `}
`;
