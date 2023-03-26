import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { getSearchResults } from 'services/tmdb';
import { slideDown, slideUp } from 'styles/css';
import { queryOptions, tmdbKeys } from 'utils/queryOptions';

import { useDebounce, useFocus } from 'hooks';
import SearchItem, { List } from './SearchItem';

interface Props {
  isVisible?: boolean;
  closeSearchBar?: () => void;
}

function SearchBar(
  { isVisible = true, closeSearchBar }: Props,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const [text, setText] = useState('');
  const [debouncedText, setDebouncedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const totalIndexRef = useRef(0);
  const navigate = useNavigate();
  useFocus(inputRef);
  const handleDebounceChange = useDebounce<React.ChangeEvent<HTMLInputElement>>(
    (e) => setDebouncedText(e.target.value),
    300,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    handleDebounceChange(e);
  };

  const handleClick = useCallback(
    (item: SearchResults) => {
      navigate(`/${item.media_type}/${item.id}`);
      if (closeSearchBar) closeSearchBar();
    },
    [closeSearchBar, navigate],
  );

  const { data } = useQuery(
    tmdbKeys.search(debouncedText),
    () => getSearchResults(debouncedText),
    {
      ...queryOptions,
      select: (results) => results.filter((item, index) => index < 6),
    },
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown': {
        if (totalIndexRef.current === currentIndex) setCurrentIndex(0);
        else setCurrentIndex(currentIndex + 1);
        break;
      }
      case 'ArrowUp': {
        if (currentIndex === -1 || currentIndex === 0)
          setCurrentIndex(totalIndexRef.current);
        else setCurrentIndex(currentIndex - 1);
        break;
      }
      case 'Enter': {
        if (data) handleClick(data[currentIndex]);

        break;
      }
      case 'Escape': {
        if (closeSearchBar) closeSearchBar();
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    if (data && totalIndexRef) totalIndexRef.current = data.length - 1;
  }, [data]);

  return (
    <SearchBarWrapper isVisible={isVisible} hasData={!!data?.length} ref={ref}>
      <div>
        <input
          ref={inputRef}
          onKeyDown={handleKeyDown}
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="영화,방송,인물을 검색할 수 있습니다."
        />

        {text.length && text === debouncedText && !data?.length ? (
          <div>
            <List noResults>
              <button type="button">
                <span>{debouncedText}의 검색 결과가 없습니다.</span>
              </button>
            </List>
          </div>
        ) : (
          <div>
            {data?.map((item, index) => (
              <SearchItem
                setCurrentIndex={setCurrentIndex}
                onClick={handleClick}
                key={item.id}
                data={item}
                index={index}
                isActive={index === currentIndex}
              />
            ))}
          </div>
        )}
      </div>
    </SearchBarWrapper>
  );
}

export default React.forwardRef(SearchBar);

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
