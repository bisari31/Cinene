import React from 'react';
import styled from 'styled-components';

import { Heart } from 'assets';
import { Button, buttonEffect } from 'styles/css';
import { useLikeQuery, useLoginPortal } from 'hooks/cinene';

interface Props {
  cinene?: CineneData;
}

function LikeButton(
  { cinene }: Props,
  ref: React.ForwardedRef<HTMLHeadingElement>,
) {
  const loginPortal = useLoginPortal();
  const { data, mutate } = useLikeQuery(
    'content',
    cinene?._id,
    loginPortal.open,
  );

  const handleMoveToReview = () => {
    if (typeof ref === 'object' && ref) {
      const { current } = ref;
      current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <StyledWrapper color="navy50">
      <Button type="button" onClick={handleMoveToReview}>
        리뷰 {cinene?.votes}
      </Button>
      <Button
        type="button"
        isActive={data?.isLike}
        hasLikes={!!data?.likes}
        onClick={() => mutate({ type: 'content', id: cinene?._id })}
      >
        <Heart /> {data?.likes ?? '0'}
      </Button>
      {loginPortal.render()}
    </StyledWrapper>
  );
}

export default React.forwardRef(LikeButton);

const StyledWrapper = styled.div`
  display: flex;
  gap: 0 1em;
  margin-top: 1rem;
  button {
    ${buttonEffect};
  }
`;
