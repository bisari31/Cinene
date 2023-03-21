import styled from 'styled-components';

import { Heart } from 'assets';
import { Button, buttonEffect } from 'styles/css';

import withLoginPortal from 'components/hoc/withLoginPortal';
import React from 'react';
import useLike from '../../hooks/useLikeQuery';

interface Props {
  cinene?: CineneData | null;
  toggleLoginModal: () => void;
}

function LikeButton(
  { cinene, toggleLoginModal }: Props,
  ref: React.ForwardedRef<HTMLHeadingElement>,
) {
  const { auth, data, mutate } = useLike(
    'content',
    cinene?._id,
    toggleLoginModal,
  );
  const handleMutate = () => {
    if (!auth) {
      toggleLoginModal();
      return;
    }
    mutate({ type: 'content', id: cinene?._id });
  };

  const handleMoveToReview = () => {
    if (typeof ref === 'object' && ref) {
      const { current } = ref;
      current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <ButtonWrapper color="navy50">
      <Button type="button" onClick={handleMoveToReview}>
        리뷰 {cinene?.votes}
      </Button>
      <Button
        type="button"
        isActive={data?.isLike}
        isZero={!data?.likes}
        onClick={handleMutate}
      >
        <Heart /> {data?.likes ?? '0'}
      </Button>
    </ButtonWrapper>
  );
}

export default withLoginPortal<
  {
    cinene?: CineneData;
  },
  HTMLHeadingElement
>(React.forwardRef(LikeButton));

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0 1em;
  margin-top: 1rem;
  button {
    ${buttonEffect};
  }
`;
