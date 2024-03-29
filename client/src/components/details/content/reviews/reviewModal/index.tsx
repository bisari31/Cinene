import styled from 'styled-components';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useMutation } from 'react-query';

import { usePrevious, useFocus } from 'hooks';
import { useLoginPortal, useMutationOptions } from 'hooks/cinene';
import { handleReview } from 'services/review';
import { cineneKeys } from 'utils/queryOptions';

import Modal from 'components/common/Modal';
import Portal from 'components/common/Portal';
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
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const [rating, setRating] = useState(hasReview?.rating || 0);
  const [comment, setComment] = useState(hasReview?.comment || '');
  const [isCommentError, setIsCommentError] = useState(false);
  const [isRatingError, setIsRatingError] = useState(false);
  const [message, setMessage] = useState('');
  const previousRating = usePrevious<number>(rating);
  const previousComment = usePrevious<string>(comment);
  const inputRef = useRef<HTMLInputElement>(null);
  const { openPortal, renderPortal } = useLoginPortal();
  const { errorHandler, queryClient } = useMutationOptions(openPortal);
  const { focus } = useFocus(inputRef);

  const { mutate } = useMutation(handleReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(
        cineneKeys.detail(data?.content_type, data?.tmdbId),
      );
      toggleReviewModal();
    },
    onError: (err: AxiosError) => errorHandler(err),
  });

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
    if (!comment || comment.length > 50) {
      setIsCommentError(true);
      return true;
    }
    if (!rating) {
      setMessage('평점을 입력하세요');
      setIsRatingError(true);
      return true;
    }
    return false;
  };

  const handleSubmit = () => {
    const isEmpty = checkEmptyValue();
    if (isEmpty) return null;
    const isChanged = checkValueChanged();
    if (!isChanged) return toggleReviewModal();
    return mutate({
      comment,
      rating,
      hasReview: hasReview?._id,
      content: data?._id,
      content_type: data?.content_type,
    });
  };

  useEffect(() => {
    focus();
  }, [focus]);

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
        <StyledContent isError={isCommentError}>
          <div>
            <RatingButtons
              rating={rating}
              onClick={handleRatingChange}
              previousRating={previousRating}
            />
            <StyledMessage>
              <p>{message}</p>
            </StyledMessage>
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="한줄평을 남겨주세요 (50자 이하)"
            value={comment}
            onChange={handleCommentChange}
          />
        </StyledContent>
      </Modal>
      {renderPortal()}
    </Portal>
  );
}

export default React.forwardRef(ReviewModal);

const StyledContent = styled.div<{
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

const StyledMessage = styled.div`
  font-size: 0.95rem;
  height: 22.8px;
  margin: 1em 0 1em 0;
`;
