import React, { memo, useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';

import { useImageUrl } from 'hooks/cinene';

interface Props {
  data: SearchResults;
  index: number;
  isActive: boolean;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  onClick: (data: SearchResults) => void;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

function SearchItem({
  data,
  index,
  setCurrentIndex,
  isActive,
  setKeyword,
  onClick,
}: Props) {
  const title = useMemo(() => {
    const { media_type: type } = data;
    if (type === 'tv' && 'name' in data) return `${data.name} (TV)`;
    if (type === 'movie' && 'title' in data) return `${data.title} (영화)`;
    if (type === 'person' && 'name' in data) return `${data.name} (인물)`;
    return '';
  }, [data]);

  const { getImageUrl } = useImageUrl();
  const poster = useMemo(
    () =>
      getImageUrl(
        'profile_path' in data ? data.profile_path : data.poster_path,
        '200',
        data.media_type === 'person',
      ),
    [data, getImageUrl],
  );

  useEffect(() => {
    if (isActive) setKeyword('name' in data ? data.name : data.title);
  }, [data, isActive, setKeyword]);

  return (
    <List isActive={isActive}>
      <button
        onFocus={() => setCurrentIndex(index)}
        onMouseOver={() => setCurrentIndex(index)}
        type="button"
        onClick={() => onClick(data)}
      >
        <img src={poster} alt={'name' in data ? data.name : data.title} />

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
      span {
        text-align: left;
      }
    }
    & + & {
      margin-top: 0.5em;
    }
  `}
`;
