import styled from 'styled-components';
import { useRef, forwardRef, ForwardedRef, useState, useCallback } from 'react';

import { usePrevious, useFocus } from 'hooks';
import { useLoginPortal } from 'hooks/cinene';

import Modal from 'components/common/Modal';
import Portal from 'components/common/Portal';
import useReviewMutation from 'components/details/hooks/useReviewMutation';
import RatingButtons from './RatingButtons';

interface Props {
  isMotionVisible: boolean;
  toggleReviewModal: () => void;
  hasReview?: Review | null;
  data?: CineneData;
}

const RATING_MESSAGE = [
  '(별로에요)',
  '(그저그래요)',
  '(괜찮아요)',
  '(좋아요)',
  '(최고에요)',
];

function ReviewModal(
  { isMotionVisible, toggleReviewModal, data, hasReview }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [rating, setRating] = useState(hasReview?.rating || 0);
  const [comment, setComment] = useState(hasReview?.comment || '');
  const [isCommentError, setIsCommentError] = useState(false);
  const [isRatingError, setIsRatingError] = useState(false);
  const [message, setMessage] = useState('');
  const previousRating = usePrevious<number>(rating);
  const previousComment = usePrevious<string>(comment);
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

  const handleRatingChange = useCallback(
    (value: number) => {
      if (isRatingError && value > 0) {
        setIsRatingError(false);
        setMessage('');
      }
      setMessage(RATING_MESSAGE[value - 1]);
      setRating(value);
    },
    [isRatingError],
  );

  const checkValueChanged = () =>
    previousComment !== comment || previousRating !== rating;

  const checkEmptyValue = () => {
    if (!comment) {
      setIsCommentError(true);
      return true;
    }
    if (!rating) {
      setMessage('평점을 입력하세요');
      setIsRatingError(true);
      return true;
    }
    if (comment.length > 50) {
      setIsCommentError(true);
      return true;
    }
    return false;
  };

  const handleSubmit = () => {
    if (checkEmptyValue()) return;
    if (!checkValueChanged()) {
      toggleReviewModal();
      return;
    }
    mutate({
      comment,
      rating,
      hasReview: hasReview?._id,
      content: data?._id,
      content_type: data?.content_type,
    });
  };

  return (
    <Portal>
      <Modal
        height="40vh"
        ref={ref}
        executeFn={handleSubmit}
        isVisible={isMotionVisible}
        closeFn={toggleReviewModal}
        buttonText={['닫기', hasReview ? '수정' : '등록']}
        color="pink"
      >
        <ModalContent isError={isCommentError}>
          <div>
            <RatingButtons
              rating={rating}
              onClick={handleRatingChange}
              previousRating={previousRating}
            />
            <MessageWrapper>
              <p>{message}</p>
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
  isError: boolean;
}>`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 100%;
  input {
    background-color: ${({ theme }) => theme.colors.navy50};
    border: ${({ isError, theme }) =>
      isError ? `1px solid ${theme.colors.red}` : 'none'};
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
`;

const MessageWrapper = styled.div`
  font-size: 0.95rem;
  height: 22.8px;
  margin: 1em 0 1em 0;
`;
