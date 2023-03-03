import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  ForwardedRef,
} from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

import { IMAGE_URL, searchMedia } from 'services/tmdb';
import { EMPTY_IMAGE, USER_IMAGE } from 'utils/imageUrl';
import { useDebounce } from 'hooks';
import { tmdbKeys } from 'utils/keys';

interface Props {
  isVisible?: boolean;
  toggleModal?: () => void;
  isMobile?: boolean;
}

function SearchBar(
  { isVisible = true, toggleModal = () => null, isMobile = false }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [text, setText] = useState('');
  const [targetIndex, setTargetIndex] = useState(-1);
  const [totalIndex, setTotalIndex] = useState(0);
  const [debouncedText, setDebouncedText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const handleDebounceChange = useDebounce<
    [React.ChangeEvent<HTMLInputElement>]
  >(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setDebouncedText(e.target.value),
    300,
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    handleDebounceChange(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown': {
        if (totalIndex === targetIndex) setTargetIndex(0);
        else setTargetIndex(targetIndex + 1);
        break;
      }
      case 'ArrowUp': {
        if (targetIndex === 0) setTargetIndex(totalIndex);
        else setTargetIndex(targetIndex - 1);
        break;
      }
      case 'Enter': {
        if (data) handleClickNavigation(data[targetIndex]);
        break;
      }
      case 'Escape': {
        toggleModal();
        break;
      }
      default:
        break;
    }
  };

  const handleClickNavigation = (item: newResults) => {
    navigate(`/${item.media_type}/${item.id}`);
    if (!isMobile) toggleModal();
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

  const { data, isFetching } = useQuery(
    tmdbKeys.search(debouncedText),
    () => searchMedia(debouncedText),
    {
      staleTime: 1000 * 60 * 5,
    },
  );

  useEffect(() => {
    if (isVisible) inputRef.current?.focus();
    return () => {
      setText('');
      setDebouncedText('');
    };
  }, [isVisible, inputRef]);

  useEffect(() => {
    if (!divRef.current) return;
    setTotalIndex(divRef.current.childElementCount - 1);
    setTargetIndex(-1);
  }, [data, divRef]);

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
        {data?.length === 0 ? (
          <div>
            <List noResults>
              <button type="button">
                <span>{debouncedText}의 검색 결과가 없습니다.</span>
              </button>
            </List>
          </div>
        ) : (
          <div ref={divRef}>
            {data?.map((item, index) => (
              <List key={item.id} isActive={index === targetIndex}>
                <button
                  onFocus={() => setTargetIndex(index)}
                  onMouseOver={() => setTargetIndex(index)}
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

export default forwardRef(SearchBar);

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

const List = styled.div<{ noResults?: boolean; isActive?: boolean }>`
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
