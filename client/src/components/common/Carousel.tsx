import { useEffect, useState, useCallback, useRef } from 'react';
import styled, { css } from 'styled-components';

import { IMAGE_URL } from 'services/movie';
import { ChevronLeft, ChevronRight } from 'assets';

interface IProps {
  data: IMovies[] | undefined;
  infinity?: boolean;
}

export default function Carousel({ data, infinity = true }: IProps) {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [totalIndex, setTotalIndex] = useState<number>();
  const [stopAnimation, setStopAnimation] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const getNewItems = useCallback(() => {
    if (!data) return;
    const front = [];
    const back = [];
    let count = 0;
    while (count < 2) {
      front.unshift(data[data.length - 1 - count]);
      back.push(data[count]);
      count += 1;
    }
    return [...front, ...data, ...back];
  }, [data]);

  const handleSlide = (num: number) => {
    if (!totalIndex) return;
    const index = currentIndex + num;
    setCurrentIndex(index);
    if (index < 0 + 2) {
      changeSlidesIndex(totalIndex - 2, 800);
    } else if (index === totalIndex - 1) {
      changeSlidesIndex(2, 800);
    }
    setStopAnimation(false);
  };

  const changeSlidesIndex = (index: number, delay: number) => {
    setTimeout(() => {
      setStopAnimation(true);
      setCurrentIndex(index);
    }, delay);
  };

  const newItems = infinity ? getNewItems() : data;

  // useEffect(() => {
  //   const timer = setTimeout(() => handleSlide(1), 3000);
  //   return () => clearTimeout(timer);
  // });

  useEffect(() => {
    setIsDisabled(true);
    setTimeout(() => setIsDisabled(false), 800);
  }, [currentIndex]);

  useEffect(() => {
    if (newItems) setTotalIndex(newItems.length - 1);
  }, [newItems]);

  useEffect(() => {
    console.log(currentIndex);
  }, [currentIndex]);

  return (
    <CarouselWrapper>
      <Items
        stopAnimation={stopAnimation}
        totalIndex={totalIndex}
        currentIndex={currentIndex}
      >
        {newItems?.map((item, index) => (
          <Item
            // eslint-disable-next-line react/no-array-index-key
            key={item.id + index}
            isActive={index === currentIndex}
          >
            <img
              src={
                item.backdrop_path
                  ? `${IMAGE_URL}/original/${item.backdrop_path}`
                  : 'https://blog.kakaocdn.net/dn/b8Kdun/btqCqM43uim/1sWJVkjEEy4LJMfR3mcqxK/img.jpg'
              }
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
        disabled={isDisabled}
        onClick={() => handleSlide(-1)}
      >
        <ChevronLeft />
      </button>
      <button
        className="right_Btn"
        disabled={isDisabled}
        type="button"
        onClick={() => handleSlide(1)}
      >
        <ChevronRight />
      </button>
    </CarouselWrapper>
  );
}

const CarouselWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    margin-bottom: 2em;
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
      overflow: hidden;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 38px;
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
  stopAnimation: boolean;
}>`
  ${({ totalIndex, currentIndex, stopAnimation }) => css`
    border-radius: 20px;
    display: flex;
    height: 400px;
    position: relative;
    transform: ${`translateX(calc((-100% / (${totalIndex} + 1)) * ${currentIndex}))`};
    transition: ${stopAnimation ? 'none' : '0.8s ease'};
  `}
`;

const Item = styled.div<{ isActive: boolean }>`
  ${({ isActive }) => css`
    border-radius: inherit;
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    padding: 0 1em;
    position: relative;
    width: 1168px;
    img {
      border-radius: inherit;
      filter: ${`brightness(${isActive ? '100%' : '30%'})`};
      object-fit: cover;
      width: 100%;
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
