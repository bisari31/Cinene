import styled from 'styled-components';
import { useState, useEffect, useRef, forwardRef, ForwardedRef } from 'react';

import { checkEmptyImageUrl } from 'utils/imageUrl';

import Modal from 'components/common/Modal';
import Portal from 'components/common/Portal';
import { Star } from 'assets';
import usePrevious from 'hooks/usePrevious';

interface IProps {
  isVisible: boolean;
  animationState: boolean;
  changeVisibility: () => void;
}

const COUNT_MESSAGE = [
  '(별로에요)',
  '(그저그래요)',
  '(괜찮아요)',
  '(좋아요)',
  '(최고에요)',
];

function ReviewModal(
  { isVisible, animationState, changeVisibility }: IProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const previousRating = usePrevious(rating);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleAddReview = () => {
    changeVisibility();
  };

  const showCountMessage = (count: number) =>
    count ? `${count}점 ${COUNT_MESSAGE[count - 1]}` : '';

  useEffect(() => {
    setComment('');
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) inputRef.current?.focus();
  }, [inputRef, isVisible]);
  useEffect(() => {
    console.log('🚀 ~ file: ReviewModal.tsx:54 ~ useEffect ~ rating', rating);
  }, [rating]);
  return (
    <Portal>
      <Modal
        height="40vh"
        ref={ref}
        executeFn={handleAddReview}
        isVisible={animationState}
        closeFn={changeVisibility}
        buttonText={['닫기', '등록']}
        color="pink"
      >
        <ModalContent>
          <div>
            <div>
              {[1, 2, 3, 4, 5].map((number) => (
                <Button
                  isIncrease={previousRating < rating}
                  isFilling={rating >= number}
                  onClick={() => setRating(number)}
                  key={number}
                  type="button"
                >
                  <Star />
                </Button>
              ))}
            </div>
            <div>
              <p>{showCountMessage(rating)}</p>
            </div>
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="한줄평을 남겨주세요"
            value={comment}
            onChange={handleChangeComment}
          />
        </ModalContent>
      </Modal>
    </Portal>
  );
}

export default forwardRef(ReviewModal);

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 100%;
  & > div:first-child {
    margin-bottom: 0.5em;
    div:nth-child(2) {
      height: 22.8px;
      margin-bottom: 0.5em;
      font-size: 0.95rem;
    }
  }
  input {
    background-color: ${({ theme }) => theme.colors.navy50};
    border: none;
    border-radius: 10px;
    color: ${({ theme }) => theme.colors.gray100};
    height: 40px;
    margin-bottom: 1.5em;
    padding: 0 1em;
    width: 100%;
    &::placeholder {
      color: ${({ theme }) => theme.colors.gray500};
    }
  }
  @media ${({ theme }) => theme.device.laptop} {
    & > div:first-child {
      margin-bottom: 1em;
      div:nth-child(1) {
        margin-bottom: 0.5em;
      }
      button {
        svg {
          width: 35px;
        }
      }
    }
  }
`;

const Button = styled.button<{ isFilling: boolean; isIncrease: boolean }>`
  background: none;
  border: none;
  svg {
    animation: ${({ isIncrease }) => isIncrease && 'pop 0.5s ease'};
    fill: ${({ theme, isFilling }) =>
      isFilling ? theme.colors.yellow : theme.colors.navy50};
    stroke: none;
    width: 30px;
  }
  @keyframes pop {
    0% {
      scale: 1;
    }
    50% {
      scale: 1.5;
    }
    100% {
      scale: 1;
    }
  }
`;
