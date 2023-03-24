import { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useSetRecoilState } from 'recoil';

import { contentIdState } from 'atom/atom';

import { useCurrentPathName, useOutsideClick } from 'hooks';
import Portal from 'components/common/Portal';
import MediaContent from './MediaContent';
import ImageModal from './ImageModal';
import useDetailQuery from './hooks/useDetailQuery';
import PersonContent from './PersonContent';
import useImageUrl from './hooks/useImageUrl';

export default function Details() {
  const setContentId = useSetRecoilState(contentIdState);
  const { ref, isVisible, toggleModal } = useOutsideClick();
  const { id, path } = useCurrentPathName();
  const { mediaData, personData, cineneData } = useDetailQuery(id, path);
  const { getPoster } = useImageUrl();

  useEffect(() => {
    setContentId(cineneData?._id);
  }, [cineneData, setContentId]);

  return (
    <DetailsWrapper src={getPoster(mediaData?.backdrop_path, 'full')}>
      <div />
      <Content>
        <div>
          <button type="button" onClick={toggleModal}>
            <img
              src={getPoster(
                mediaData?.poster_path || personData?.profile_path,
                '300',
                path === 'person',
              )}
              alt="poster"
            />
          </button>
        </div>
        {path === 'person' ? (
          <PersonContent
            path={path}
            id={id}
            tmdbData={personData}
            cineneData={cineneData}
          />
        ) : (
          <MediaContent
            path={path}
            id={id}
            tmdbData={mediaData}
            cineneData={cineneData}
          />
        )}
      </Content>
      {isVisible && (
        <Portal>
          <ImageModal
            modalRef={ref}
            toggleModal={toggleModal}
            isVisible={isVisible}
            src={getPoster(
              mediaData?.poster_path || personData?.profile_path,
              'full',
              path === 'person',
            )}
          />
        </Portal>
      )}
    </DetailsWrapper>
  );
}

const DetailsWrapper = styled.div<{ src: string }>`
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
