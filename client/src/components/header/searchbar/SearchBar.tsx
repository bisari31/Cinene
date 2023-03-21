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
  const [debouncedText, setDebouncedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const totalIndexRef = useRef(0);

  const { data } = useQuery(
    tmdbKeys.search(debouncedText),
    () => searchMedia(debouncedText),
    {
      staleTime: 1000 * 60 * 5,
    },
  );

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
        if (totalIndexRef.current === currentIndex) setCurrentIndex(0);
        else setCurrentIndex(currentIndex + 1);
        break;
      }
      case 'ArrowUp': {
        if (currentIndex === 0) setCurrentIndex(totalIndexRef.current ?? 0);
        else setCurrentIndex(currentIndex - 1);
        break;
      }
      case 'Enter': {
        if (data) handleClickNavigation(data[currentIndex]);
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

  const handleClickNavigation = (item: SearchResults) => {
    navigate(`/${item.media_type}/${item.id}`);
    if (!isMobile) toggleModal();
  };

  const getSearchTitle = (item: SearchResults) => {
    const { media_type: type } = item;
    if (type === 'tv' && 'name' in item) return `${item.name} (TV)`;
    if (type === 'movie' && 'title' in item) return `${item.title} (영화)`;
    if (type === 'person' && 'name' in item) return `${item.name} (인물)`;
    return '정보 없음';
  };

  const getSearchImage = (item: SearchResults) => {
    const url = `${IMAGE_URL}/w200/`;
    if (item.media_type === 'person' && 'profile_path' in item) {
      return item.profile_path ? url + item.profile_path : USER_IMAGE;
    }
    return 'poster_path' in item && item.poster_path
      ? url + item.poster_path
      : EMPTY_IMAGE;
  };

  useEffect(() => {
    if (isVisible) inputRef.current?.focus();
  }, [isVisible]);

  useEffect(() => {
    console.log(data);
    if (data && totalIndexRef) totalIndexRef.current = data.length;
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
              <List key={item.id} isActive={index === currentIndex}>
                <button
                  onFocus={() => setCurrentIndex(index)}
                  onMouseOver={() => setCurrentIndex(index)}
                  type="button"
                  onClick={() => handleClickNavigation(item)}
                >
                  <img
                    src={getSearchImage(item)}
                    alt={'name' in item ? item.name : item.title}
                  />

                  <span>{getSearchTitle(item)}</span>
                </button>
              </List>
            ))}
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
