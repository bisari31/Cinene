import styled, { css } from 'styled-components';

import { useCurrentPathName, useOutsideClick } from 'hooks';

import Portal from 'components/common/Portal';
import MediaContent from './MediaContent';
import ImageModal from './ImageModal';
import useDetailQuery from './hooks/useDetailQuery';
import PersonContent from './PersonContent';

export default function Details() {
  const { ref, isVisible, toggleModal } = useOutsideClick();
  const { id, path } = useCurrentPathName();
  const { mediaData, personData, backdrop, getPoster } = useDetailQuery(
    id,
    path,
  );

  return (
    <DetailsWrapper src={backdrop}>
      <div />
      <Content>
        <div>
          <button type="button" onClick={toggleModal}>
            <img src={getPoster(path, 'w500')} alt="poster" />
          </button>
        </div>
        {path === 'person' ? (
          <PersonContent path={path} id={id} data={personData} />
        ) : (
          <MediaContent path={path} id={id} data={mediaData} />
        )}
      </Content>
      {isVisible && (
        <Portal>
          <ImageModal
            modalRef={ref}
            toggleModal={toggleModal}
            isVisible={isVisible}
            src={getPoster(path, 'original')}
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
