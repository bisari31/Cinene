import { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useQuery } from 'react-query';

import { getMediaDetail, IMAGE_URL } from 'services/media';
import useOutsideClick from 'hooks/useOutsideClick';
import useCurrentPathName from 'hooks/useCurrentPathName';

import Description from 'components/details/Description';
import Portal from 'components/common/Portal';
import ModalImage from 'components/details/ModalImage';
import { EMPTY_IMAGE } from 'utils/imageUrl';

export default function DetailPage() {
  const { ref, isVisible, handleChangeVisibility } = useOutsideClick();
  const { id, path } = useCurrentPathName();
  const { data } = useQuery([path, id], () => getMediaDetail(id, path));

  return (
    <DetailPageWrapper
      src={
        data?.backdrop_path
          ? `${IMAGE_URL}/original/${data?.backdrop_path}`
          : EMPTY_IMAGE
      }
    >
      <div />
      <Content>
        <div>
          <button type="button" onClick={() => handleChangeVisibility()}>
            <img
              src={
                data?.poster_path
                  ? `${IMAGE_URL}/w300/${data?.poster_path}`
                  : EMPTY_IMAGE
              }
              alt="poster"
            />
          </button>
        </div>
        <Description data={data} path={path} id={id} />
      </Content>
      {isVisible && (
        <Portal>
          <ModalImage
            modalRef={ref}
            handleChangeVisibility={handleChangeVisibility}
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
      height: 50vh;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: -1;
    }
  `}
`;

const Content = styled.article`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    padding-top: 15em;

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
        position: relative;
        width: 200px;
        img {
          height: 100%;
          object-fit: cover;
          width: 100%;
        }
      }
    }
    @media ${theme.device.laptop} {
      flex-direction: row;
      & > div:nth-child(2) {
        padding-left: 5%;
        width: calc(100% - 200px);
      }
    }
  `}
`;
