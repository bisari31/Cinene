import styled from 'styled-components';
import { useState, useEffect, useRef, forwardRef, ForwardedRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { Star } from 'assets';
import usePrevious from 'hooks/usePrevious';
import { addRating } from 'services/review';

import Modal from 'components/common/Modal';
import Portal from 'components/common/Portal';
import { IReviewProps } from './index';

interface IProps extends IReviewProps {
  isVisible: boolean;
  animationState: boolean;
  changeVisibility: () => void;
  hasReview: IDocument | null | undefined;
}

const RATING_MESSAGE = [
  '(별로에요)',
  '(그저그래요)',
  '(괜찮아요)',
  '(좋아요)',
  '(최고에요)',
];

function ReviewModal(
  { isVisible, animationState, changeVisibility, data, hasReview }: IProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const previousRating = usePrevious(rating);
  const inputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const { mutate } = useMutation(addRating, {
    onSuccess: () => {
      console.log(data?.type, data?.tmdbId);
      queryClient.invalidateQueries(['cinene', data?.type, data?.tmdbId]);
      queryClient.invalidateQueries(['reviews', data?.type, data?._id]);
      changeVisibility();
    },
  });

  const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleAddReview = () => {
    mutate({
      comment,
      rating,
      contentId: data?._id,
      contentType: data?.type,
      isEditing: hasReview || null,
    });
    // mutate({
    //   comment,
    //   rating,
    //   contentId: data?._id,
    //   contentType: data?.type,
    //   isEditing: hasReview || null,
    // });
  };

  const showRatingMessage = (value: number) =>
    value ? `${value}점 ${RATING_MESSAGE[value - 1]}` : '';

  useEffect(() => {
    if (isVisible) {
      inputRef.current?.focus();
      setComment('');
    }
  }, [inputRef, isVisible]);

  useEffect(() => {
    if (hasReview) {
      setRating(hasReview.rating);
      setComment(hasReview.comment);
    }
  }, [hasReview]);

  if (!data) return null;

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
              <p>{showRatingMessage(rating)}</p>
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
