import styled, { css } from 'styled-components';
import { useEffect, useState } from 'react';

import { outside } from 'styles/css';
import { Close } from 'assets';
import { EMPTY_IMAGE } from 'utils/imageUrl';
import useEscapeClose from 'hooks/useEscapeClose';
import usePreventScrolling from 'hooks/usePreventScrolling';

interface Props {
  src: string;
  isVisible: boolean;
  handleChangeVisibility: () => void;
  modalRef: React.RefObject<HTMLDivElement>;
}

export default function ModalImage({
  src,
  isVisible,
  handleChangeVisibility,
  modalRef,
}: Props) {
  const [height, setHeight] = useState<number>();

  useEscapeClose(isVisible, handleChangeVisibility);
  usePreventScrolling(isVisible);

  useEffect(() => {
    setHeight(window.scrollY);
  }, [isVisible]);

  return (
    <OutSide height={height}>
      <Modal ref={modalRef}>
        <div />
        <img src={src ?? EMPTY_IMAGE} alt="poster" />
        <button type="button" onClick={() => handleChangeVisibility()}>
          <Close />
        </button>
      </Modal>
    </OutSide>
  );
}

const OutSide = styled.div<{ height: number | undefined }>`
  ${outside}
`;

const Modal = styled.div`
  ${({ theme }) => css`
    height: 80vh;
    position: relative;
    width: 100vw;
    img {
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
    button {
      align-items: center;
      background: rgba(0, 0, 0, 0.4);
      border: none;
      border-radius: 3px;
      display: flex;
      height: 35px;
      justify-content: center;
      padding: 0;
      position: absolute;
      right: 1em;
      top: 1em;
      width: 35px;
      svg {
        fill: ${theme.colors.gray50};
        line-height: 25px;
        stroke: ${theme.colors.gray50};
        stroke-width: 0.3;
        width: 25px;
      }
    }
    @media ${theme.device.tablet} {
      height: 100vh;
      width: 650px;
    }
  `}
`;
