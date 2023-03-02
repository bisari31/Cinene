import styled from 'styled-components';
import { useState, useEffect, useRef, forwardRef, ForwardedRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { Star } from 'assets';
import { addRating } from 'services/review';
import { usePrevious } from 'hooks';

import Modal from 'components/common/Modal';
import Portal from 'components/common/Portal';
import { cineneKeys } from 'utils/keys';
import { IReviewProps } from './index';

const RATING_MESSAGE = [
  '(별로에요)',
  '(그저그래요)',
  '(괜찮아요)',
  '(좋아요)',
  '(최고에요)',
];

interface IProps extends IReviewProps {
  isVisible: boolean;
  animationState: boolean;
  changeVisibility: () => void;
  hasReview: IReview | null | undefined;
}

function ReviewModal(
  { isVisible, animationState, changeVisibility, data, hasReview }: IProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [rating, setRating] = useState(hasReview?.rating || 0);
  const [comment, setComment] = useState(hasReview?.comment || '');
  const [isCommentError, setIsCommentError] = useState(false);
  const [isRatingError, setIsRatingError] = useState(false);
  const previousRating = usePrevious(rating);
  const previousComment = usePrevious(comment);
  const inputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const { mutate } = useMutation(addRating, {
    onSuccess: () => {
      queryClient.invalidateQueries(
        cineneKeys.detail(data?.type, data?.tmdbId),
      );
      changeVisibility();
    },
  });

  const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleAddReview = () => {
    if (!comment || comment.length > 50) return setIsCommentError(true);
    if (!rating) return setIsRatingError(true);
    if (comment === previousComment && rating === previousRating)
      return changeVisibility();
    mutate({
      comment,
      rating,
      contentId: data?._id,
      contentType: data?.type,
      isEditing: hasReview || null,
    });
  };

  const showRatingMessage = (value: number) => {
    if (isRatingError) return '평점을 남겨주세요';
    return value ? `${value}점 ${RATING_MESSAGE[value - 1]}` : '';
  };

  useEffect(() => {
    if (isVisible) {
      inputRef.current?.focus();
    }
  }, [inputRef, isVisible]);

  useEffect(() => {
    if (hasReview) {
      setRating(hasReview.rating);
      setComment(hasReview.comment);
    }
  }, [hasReview]);

  useEffect(() => {
    if (isRatingError && rating > 0) {
      setIsRatingError(false);
    }
  }, [isRatingError, rating]);

  useEffect(() => {
    if (isCommentError && comment !== previousComment) {
      setIsCommentError(false);
    }
  }, [isCommentError, comment, previousComment]);

  return (
    <Portal>
      <Modal
        height="40vh"
        ref={ref}
        executeFn={handleAddReview}
        isVisible={animationState}
        closeFn={changeVisibility}
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
                  onClick={() => setRating(value)}
                  key={value}
                  type="button"
                >
                  <Star />
                </Button>
              ))}
            </div>
            <div>
              <p>{showRatingMessage(rating)}</p>
            </div>
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="한줄평을 남겨주세요 (50자 이하)"
            value={comment}
            onChange={handleChangeComment}
          />
        </ModalContent>
      </Modal>
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
    div:nth-child(2) {
      color: ${({ theme, isRatingError }) =>
        isRatingError ? theme.colors.red : ''};
      font-size: 0.95rem;
      height: 22.8px;
      margin-bottom: 0.5em;
    }
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