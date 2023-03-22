import { memo } from 'react';
import styled, { css } from 'styled-components';

import useSearchResultsDisplay from '../hooks/useSearchResultsDisplay';

interface Props {
  data: SearchResults;
  index: number;
  isActive: boolean;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  onClick: (data: SearchResults) => void;
}

function SearchItem({
  data,
  index,
  setCurrentIndex,
  isActive,
  onClick,
}: Props) {
  const { image, title } = useSearchResultsDisplay(data);

  return (
    <List isActive={isActive}>
      <button
        onFocus={() => setCurrentIndex(index)}
        onMouseOver={() => setCurrentIndex(index)}
        type="button"
        onClick={() => onClick(data)}
      >
        <img src={image} alt={'name' in data ? data.name : data.title} />

        <span>{title}</span>
      </button>
    </List>
  );
}

export default memo(SearchItem);

export const List = styled.div<{
  noResults?: boolean;
  isActive?: boolean;
}>`
  ${({ theme, noResults, isActive }) => css`
    border-radius: inherit;
    height: 60px;
    overflow: hidden;
    button {
      padding: 0 1em;
      width: 100%;
      height: 100%;
      border: none;
      pointer-events: ${noResults && 'none'};
      color: #fff;
      display: flex;
      align-items: center;
      background: none;
      background-color: ${isActive && theme.colors.navy};
      border-radius: inherit;
      img {
        border-radius: inherit;
        height: 55px;
        margin-right: 1em;
        object-fit: cover;
        width: 45px;
      }
    }
    & + & {
      margin-top: 0.5em;
    }
  `}
`;
