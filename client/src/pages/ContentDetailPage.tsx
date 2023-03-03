import styled, { css } from 'styled-components';
import { useQuery } from 'react-query';

import { getMediaDetail, getPersonDetail, IMAGE_URL } from 'services/tmdb';

import { EMPTY_IMAGE, USER_IMAGE } from 'utils/imageUrl';
import { useCurrentPathName, useOutsideClick } from 'hooks';

import Description from 'components/details/MediaDescription';
import Portal from 'components/common/Portal';
import ModalImage from 'components/details/ModalImage';
import PersonDescription from 'components/details/PersonDescription';
import { tmdbKeys } from 'utils/keys';

export default function DetailPage() {
  const { ref, isVisible, toggleModal } = useOutsideClick();

  const { id, path } = useCurrentPathName();

  const { data } = useQuery(
    tmdbKeys.detail(path, id),
    () => getMediaDetail(id, path),
    {
      enabled: path !== 'person',
      staleTime: 1000 * 60 * 60,
    },
  );

  const { data: personData } = useQuery(
    tmdbKeys.detail(path, id),
    () => getPersonDetail(id, path),
    {
      enabled: path === 'person',
      staleTime: 1000 * 60 * 60,
    },
  );

  const getBackdrop = () => {
    if (data?.backdrop_path) {
      return `${IMAGE_URL}/original/${data?.backdrop_path}`;
    }
    return EMPTY_IMAGE;
  };

  const getPoster = (pathname: string, size: 'w500' | 'original') => {
    if (pathname === 'person') {
      return personData?.profile_path
        ? `${IMAGE_URL}/${size}/${personData.profile_path}`
        : USER_IMAGE;
    }
    if (data?.poster_path) {
      return `${IMAGE_URL}/${size}/${data?.poster_path}`;
    }
    return EMPTY_IMAGE;
  };

  return (
    <DetailPageWrapper src={getBackdrop()}>
      <div />
      <Content>
        <div>
          <button type="button" onClick={() => toggleModal()}>
            <img src={getPoster(path, 'w500')} alt="poster" />
          </button>
        </div>
        {path === 'person' ? (
          <PersonDescription path={path} id={id} data={personData} />
        ) : (
          <Description data={data} path={path} id={id} />
        )}
      </Content>
      {isVisible && (
        <Portal>
          <ModalImage
            modalRef={ref}
            toggleModal={toggleModal}
            isVisible={isVisible}
            src={getPoster(path, 'original')}
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
    h2 {
      font-size: 2.3rem;
      font-weight: 500;
      line-height: 1.5;
    }
    h3 {
      font-size: 1rem;
      font-weight: 500;
      height: 30px;
      line-height: 30px;
      margin-bottom: 1.5rem;
    }

    & > div:nth-child(1) {
      bottom: 3em;
      position: relative;
      button {
        background: none;
        border: none;
        border-radius: 30px;
        height: 290px;
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
