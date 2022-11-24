import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled, { css } from 'styled-components';

import { getPopularMovies, IMAGE_URL } from 'services/movie';
import { ChevronLeft, ChevronRight } from 'assets';

export default function Popular() {
  const { data } = useQuery(['movie', 'popular'], getPopularMovies, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const [currentIndex, setCurrentIndex] = useState(2);
  const [totalIndex, setTotalIndex] = useState<number>();

  const getNewItems = (array: IMovies[] | undefined) => {
    if (!array) return;
    const front = [];
    const back = [];
    let count = 0;
    while (count < 2) {
      front.unshift(array[array.length - 1 - count]);
      back.push(array[count]);
      count += 1;
    }
    return [...front, ...array, ...back];
  };

  const handleSlide = (num: number) => {
    if (!totalIndex) return;
    let index = currentIndex + num;
    if (index < 0) index = totalIndex;
    else if (index > totalIndex) index = 0;
    setCurrentIndex(index);
  };

  const newItems = getNewItems(data);

  // useEffect(() => {
  //   const timer = setTimeout(() => handleSlide(1), 3000);
  //   return () => clearTimeout(timer);
  // });

  useEffect(() => {
    if (newItems) setTotalIndex(newItems.length - 1);
  }, [newItems]);

  return (
    <Slide>
      <Items totalIndex={totalIndex} currentIndex={currentIndex}>
        {newItems?.map((item, index) => (
          <Item key={item.id} isActive={index === currentIndex}>
            <img
              src={`${IMAGE_URL}/original/${item.backdrop_path}`}
              alt="movie_poster"
            />
            <div>
              <span>{item.name || item.title}</span>
            </div>
          </Item>
        ))}
      </Items>
      <button
        className="left_Btn"
        type="button"
        onClick={() => handleSlide(-1)}
      >
        <ChevronLeft />
      </button>
      <button
        className="right_Btn"
        type="button"
        onClick={() => handleSlide(1)}
      >
        <ChevronRight />
      </button>
    </Slide>
  );
}

const Slide = styled.div`
  ${({ theme }) => css`
    height: 100%;
    overflow: hidden;
    position: relative;
    button {
      align-items: center;
      background-color: ${theme.colors.black};
      border: none;
      border-radius: 50%;
      display: none;
      height: 38px;
      opacity: 0.6;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 38px;
      overflow: hidden;
      svg {
        stroke: #fff;
        stroke-width: 1.5;
      }
    }
    .left_Btn {
      left: 5%;
    }
    .right_Btn {
      right: 5%;
    }
    &:hover {
      button {
        display: flex;
      }
    }
  `}
`;

const Items = styled.div<{
  totalIndex: number | undefined;
  currentIndex: number;
}>`
  ${({ totalIndex, currentIndex }) => css`
    border-radius: 20px;
    display: flex;
    height: 400px;
    /* left: 35%; */
    position: relative;
    transform: ${`translateX(calc((-100% / ${totalIndex}) * ${currentIndex}))`};
    transition: 1s ease;
    width: ${`calc(100% * ${totalIndex})`};
  `}
`;

const Item = styled.div<{ isActive: boolean }>`
  ${({ isActive }) => css`
    border-radius: inherit;
    display: flex;
    justify-content: center;
    padding: 0 1em;
    position: relative;
    width: 1168px;
    img {
      border-radius: inherit;
      filter: ${`brightness(${isActive ? '100%' : '30%'})`};
      height: 100%;
      object-fit: cover;
      width: 1168px;
    }
    div {
      bottom: 3.5em;
      display: ${!isActive && 'none'};
      left: 4.5em;
      position: absolute;
      span {
        color: #fff;
        font-size: 2rem;
      }
    }
  `}
`;
