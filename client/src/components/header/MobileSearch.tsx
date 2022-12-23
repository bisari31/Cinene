import { ChevronLeft } from 'assets';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import SearchBar from './SearchBar';

export default function MobileSearch() {
  const navigate = useNavigate();
  return (
    <MobileSearchWrapper>
      <button type="button" onClick={() => navigate(-1)}>
        <ChevronLeft />
      </button>
      <SearchBar isMobile />
    </MobileSearchWrapper>
  );
}

const MobileSearchWrapper = styled.div`
  ${({ theme }) => css`
    padding: 1em;
    & > div {
      margin-top: 1em;
      position: static;
      animation: none;
      width: 100%;
      & > div:first-child {
        width: 100%;
        input {
          width: 100%;
        }
      }
    }
    & > button {
      background: ${theme.colors.navy100};
      border: none;
      border-radius: 10px;
      height: 35px;
      padding: 0;
      width: 35px;
      svg {
        height: 80%;
        stroke: #fff;
        width: 80%;
      }
    }
  `}
`;
