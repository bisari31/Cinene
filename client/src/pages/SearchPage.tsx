import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { ChevronLeft } from 'assets';
import { LeftButton } from 'styles/css';

import SearchBar from 'components/header/searchbar/SearchBar';

export default function SearchPage() {
  const navigate = useNavigate();

  return (
    <StyledWrapper>
      <button type="button" onClick={() => navigate(-1)}>
        <ChevronLeft />
      </button>
      <SearchBar />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  ${({ theme }) => css`
    padding: 1em;
    & > div {
      animation: none;
      margin-top: 1em;
      position: static;
      width: 100%;
      & > div:first-child {
        width: 100%;
        input {
          width: 100%;
        }
      }
    }
    & > button {
      ${LeftButton};
      background-color: ${theme.colors.navy100};
    }
  `}
`;
