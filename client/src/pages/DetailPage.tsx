import styled, { css } from 'styled-components';
import { useQuery } from 'react-query';

import { getMediaDetail, IMAGE_URL } from 'services/media';

import Actors from 'components/details/Actors';
import Description from 'components/details/Description';
import useCurrentPathName from 'hooks/useCurrentPathName';
import useOutsideClick from 'hooks/useOutsideClick';
import Portal from 'components/common/Portal';
import { useEffect, useState } from 'react';
import ModalImage from 'components/details/ModalImage';

export default function DetailPage() {
  const { ref, isVisible, changeVisibility } = useOutsideClick();

  const { id, path } = useCurrentPathName();

  const { data } = useQuery([path, id], () => getMediaDetail(id, path));

  return (
    <DetailPageWrapper
      src={
        data?.backdrop_path
          ? `${IMAGE_URL}/original/${data?.backdrop_path}`
          : 'https://blog.kakaocdn.net/dn/b8Kdun/btqCqM43uim/1sWJVkjEEy4LJMfR3mcqxK/img.jpg'
      }
    >
      <div />
      <Background />
      <Content>
        <div>
          <button type="button" onClick={() => changeVisibility()}>
            <img
              src={
                data?.poster_path
                  ? `${IMAGE_URL}/original/${data?.poster_path}`
                  : 'https://blog.kakaocdn.net/dn/b8Kdun/btqCqM43uim/1sWJVkjEEy4LJMfR3mcqxK/img.jpg'
              }
              alt="poster"
            />
          </button>
        </div>
        <div>
          <Description data={data} path={path} id={id} />
          <Actors path={path} id={id} />
        </div>
      </Content>
      {isVisible && (
        <Portal>
          <ModalImage
            modalRef={ref}
            changeVisibility={changeVisibility}
            isVisible={isVisible}
            src={`${IMAGE_URL}/original/${data?.poster_path}`}
          />
        </Portal>
      )}
    </DetailPageWrapper>
  );
}

const DetailPageWrapper = styled.div<{ src: string }>`
  ${({ src }) => css`
    & > div:first-child {
      background: ${`linear-gradient(
      rgba(24, 25, 32, 0.5) 10vh,
      rgba(24, 25, 32, 1) 50vh
      ), url(${src}) center`};
      background-size: cover;
      height: 50%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: -1;
    }
  `}
`;

const Background = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.navy};
    height: ${`calc(${theme.config.header} + 100% + 200px)`};
    left: 0;
    position: absolute;
    top: ${theme.config.header};
    width: 100%;
    z-index: -2;
  `}
`;

const Content = styled.article`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-top: 15em;
    position: relative;
    & > div:nth-child(1) {
      bottom: 3em;
      position: relative;
      button {
        background: none;
        border: none;
        border-radius: 30px;
        height: 300px;
        overflow: hidden;
        padding: 0;
        width: 200px;
        img {
          height: 100%;
          object-fit: cover;
          width: 100%;
        }
      }
    }
    & > div:last-child {
      display: flex;
      flex-direction: column;
      div:last-child {
      }
    }

    @media (max-width: 1050px) {
      flex-direction: column;
      }
    }
    @media (min-width: 1300px) {
      justify-content: space-between;
      & > div:last-child {
        flex-direction: row;
      }
    }
  `}
`;
