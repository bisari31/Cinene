import styled from 'styled-components';
import { useState, useRef, forwardRef, ForwardedRef } from 'react';

import { Star } from 'assets';
import { useLoginPortal, usePrevious } from 'hooks';

import Modal from 'components/common/Modal';
import Portal from 'components/common/Portal';
import useReviewMutation from 'components/details/hooks/useReviewMutation';
import useFocus from 'hooks/useFocus';

const RATING_MESSAGE = [
  '(별로에요)',
  '(그저그래요)',
  '(괜찮아요)',
  '(좋아요)',
  '(최고에요)',
];

interface Props {
  isMotionVisible: boolean;
  toggleReviewModal: () => void;
  hasReview?: Review | null;
  data?: CineneData;
}

function ReviewModal(
  { isMotionVisible, toggleReviewModal, data, hasReview }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [rating, setRating] = useState(hasReview?.rating || 0);
  const [comment, setComment] = useState(hasReview?.comment || '');
  const [isCommentError, setIsCommentError] = useState(false);
  const [isRatingError, setIsRatingError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const previousRating = usePrevious(rating);
  const previousComment = usePrevious(comment);
  const inputRef = useRef<HTMLInputElement>(null);
  const { openModal, renderPortal } = useLoginPortal();
  const mutate = useReviewMutation(toggleReviewModal, openModal, data);
  useFocus(inputRef);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
    if (isCommentError && e.target.value !== previousComment) {
      setIsCommentError(false);
    }
  };
  const handleRatingChange = (value: number) => {
    if (isRatingError && value > 0) {
      setIsRatingError(false);
    }
    setErrorMessage(RATING_MESSAGE[value - 1]);
    setRating(value);
  };

  const handleReviewSubmit = () => {
    if (!comment) {
      setIsCommentError(true);
      return;
    }
    if (!rating) {
      setIsRatingError(true);
      setErrorMessage('점수를 입력하세요');
      return;
    }
    if (comment.length > 50) {
      setIsCommentError(true);
      setErrorMessage('50글자를 넘겼습니다.');
      return;
    }
    if (comment === previousComment && rating === previousRating) {
      toggleReviewModal();
      return;
    }
    mutate({
      comment,
      rating,
      content: data?._id,
      content_type: data?.content_type,
      hasReview: hasReview?._id,
    });
  };

  return (
    <Portal>
      <Modal
        height="40vh"
        ref={ref}
        executeFn={handleReviewSubmit}
        isVisible={isMotionVisible}
        closeFn={toggleReviewModal}
        buttonText={['닫기', hasReview ? '수정' : '등록']}
        color="pink"
      >
        <ModalContent
          isCommentError={isCommentError}
          isRatingError={isRatingError}
        >
          <div>
            <div>
              {[1, 2, 3, 4, 5].map((value) => (
                <Button
                  isIncreased={rating > previousRating}
                  yellow={rating >= value}
                  onClick={() => handleRatingChange(value)}
                  key={value}
                  type="button"
                >
                  <Star />
                </Button>
              ))}
            </div>
            <MessageWrapper isError={isRatingError || isCommentError}>
              <p>{errorMessage}</p>
            </MessageWrapper>
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="한줄평을 남겨주세요 (50자 이하)"
            value={comment}
            onChange={handleCommentChange}
          />
        </ModalContent>
      </Modal>
      {renderPortal()}
    </Portal>
  );
}

export default forwardRef(ReviewModal);

const ModalContent = styled.div<{
  isCommentError: boolean;
  isRatingError: boolean;
}>`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 100%;
  & > div:first-child {
    margin-bottom: 0.5em;
  }
  input {
    background-color: ${({ theme }) => theme.colors.navy50};
    border: ${({ isCommentError, theme }) =>
      isCommentError ? `1px solid ${theme.colors.red}` : 'none'};
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

const Button = styled.button<{ yellow: boolean; isIncreased: boolean }>`
  background: none;
  border: none;
  svg {
    animation: ${({ isIncreased }) => isIncreased && 'pop 0.5s ease'};
    fill: ${({ theme, yellow }) =>
      yellow ? theme.colors.yellow : theme.colors.navy50};
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

const MessageWrapper = styled.div<{ isError: boolean }>`
  color: ${({ theme, isError }) => (isError ? theme.colors.red : '')};
  font-size: 0.95rem;
  height: 22.8px;
  margin-bottom: 0.5em;
`;
