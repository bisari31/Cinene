import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

import useDebounce from 'hooks/useDebounce';
import { IMAGE_URL, searchMedia } from 'services/media';
import { EMPTY_IMAGE, USER_IMAGE } from 'utils/imageUrl';

interface Props {
  elementRef?: React.RefObject<HTMLDivElement>;
  isVisible?: boolean;
  handleChangeVisibility?: () => void;
  isMobile?: boolean;
}

export default function SearchBar({
  elementRef,
  isVisible = true,
  handleChangeVisibility = () => null,
  isMobile = false,
}: Props) {
  const [text, setText] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleEscClose = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && !isMobile) handleChangeVisibility();
  };

  const handleClickNavigation = (item: newResults) => {
    navigate(`/${item.media_type}/${item.id}`);
    if (!isMobile) handleChangeVisibility();
  };

  const getSearchTitle = (item: newResults) => {
    if (item.media_type === 'tv') return `${item.name} (TV)`;
    if (item.media_type === 'movie') return `${item.title} (영화)`;
    return `${item.name} (인물)`;
  };

  const getSearchImage = (item: newResults) => {
    const url = `${IMAGE_URL}/w200/`;
    if (item.media_type === 'person') {
      return item.profile_path ? url + item.profile_path : USER_IMAGE;
    }
    return item.poster_path ? url + item.poster_path : EMPTY_IMAGE;
  };

  const debounceText = useDebounce(text, 500);
  const { data, isFetching } = useQuery(
    ['search', debounceText],
    () => searchMedia(debounceText),
    {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: false,
    },
  );

  useEffect(() => {
    if (isVisible) inputRef.current?.focus();
    return () => setText('');
  }, [isVisible, inputRef]);

  useEffect(() => {
    console.log('🚀 ~ file: SearchBar.tsx:74 ~ data', data);
  }, [data]);

  return (
    <SearchBarWrapper
      isVisible={isVisible}
      hasData={!!data?.length}
      ref={elementRef}
    >
      <div>
        <input
          ref={inputRef}
          onKeyDown={handleEscClose}
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="영화,방송,인물을 검색할 수 있습니다."
        />
        {data?.length === 0 ? (
          <div>
            <List noResults>
              <button type="button">
                <span>{debounceText}의 검색 결과가 없습니다.</span>
              </button>
            </List>
          </div>
        ) : (
          <div>
            {data?.map((item) => (
              <List key={item.id}>
                <button
                  type="button"
                  onClick={() => handleClickNavigation(item)}
                >
                  <img
                    src={getSearchImage(item)}
                    alt={item.name || item.title}
                  />

                  <span>{getSearchTitle(item)}</span>
                </button>
              </List>
            ))}
          </div>
        )}
        {isFetching && (
          <div>
            <List noResults>
              <button type="button">
                <span>검색중.....</span>
              </button>
            </List>
          </div>
        )}
      </div>
    </SearchBarWrapper>
  );
}

const slideDown = keyframes`
from {
  transform: translateY(-100px);
  opacity: 0;
}
to {
  transform: translateY(0);
  opacity: 1;
}
`;
const slideUp = keyframes`
0% {
  transform: translateY(0);
  opacity: 1;
}
80% {
  transform: translateY(-100px);
  opacity: 0;
}`;

const SearchBarWrapper = styled.div<{
  hasData: boolean;
  isVisible: boolean;
}>`
  ${({ theme, hasData, isVisible }) => css`
    animation: ${isVisible ? slideDown : slideUp} 0.5s ease-out;
    position: absolute;
    z-index: 100;
    & > div:first-child {
      position: relative;
      input {
        background-color: ${theme.colors.navy100};
        border: none;
        border-radius: 12px;
        color: #fff;
        font-size: 0.8rem;
        font-weight: 300;
        height: 40px;
        padding: 1em 1.5em;
        width: 400px;
        &::placeholder {
          color: ${theme.colors.gray300};
          font-weight: 300;
        }
      }
      & > div {
        background-color: ${theme.colors.navy100};
        border-radius: 12px;
        padding: ${hasData && '1em 0.5em'};
        position: absolute;
        top: 3.3em;
        width: 100%;
        z-index: 10;
        span {
          font-size: 0.8rem;
          font-weight: 300;
        }
      }
    }
  `}
`;

const List = styled.div<{ noResults?: boolean }>`
  ${({ theme, noResults }) => css`
    border-radius: inherit;
    height: 60px;
    overflow: hidden;
    /* width: 100%; */
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
      border-radius: inherit;
      img {
        border-radius: inherit;
        height: 55px;
        margin-right: 1em;
        object-fit: cover;
        width: 45px;
      }
      &:hover {
        background-color: ${!noResults && theme.colors.navy};
      }
    }
    & + & {
      margin-top: 0.5em;
    }
  `}
`;
