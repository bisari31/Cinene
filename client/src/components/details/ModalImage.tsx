import { Close } from 'assets';
import useDarkOutside from 'hooks/useDarkOutside';
import useEscapeClose from 'hooks/useEscapeClose';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { outside } from 'styles/css';

interface Props {
  src: string;
  isVisible: boolean;
  changeVisibility: () => void;
  modalRef: React.RefObject<HTMLDivElement>;
}

export default function ModalImage({
  src,
  isVisible,
  changeVisibility,
  modalRef,
}: Props) {
  const [height, setHeight] = useState<number>();

  useEscapeClose(isVisible, changeVisibility);
  useDarkOutside(isVisible);

  useEffect(() => {
    setHeight(window.scrollY);
  }, [isVisible]);

  return (
    <OutSide height={height}>
      <Modal ref={modalRef}>
        <div />
        <img
          src={
            src ??
            'https://blog.kakaocdn.net/dn/b8Kdun/btqCqM43uim/1sWJVkjEEy4LJMfR3mcqxK/img.jpg'
          }
          alt="poster"
        />
        <button type="button" onClick={() => changeVisibility()}>
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
    height: 70vh;
    position: relative;
    img {
      height: 100%;
      object-fit: contain;
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
      height: 90vh;
    }
  `}
`;
