import { forwardRef, useEffect } from 'react';
import styled from 'styled-components';

import { Heart } from 'assets';
import { Button, buttonEffect } from 'styles/css';
import useOutsideClick from 'hooks/useOutsideClick';
import useLike from 'hooks/useLike';

import LoginPortal from 'components/common/LoginPortal';

interface IProps {
  cinene: IFavoritesContents | null | undefined;
}

function LikeButton(
  { cinene }: IProps,
  ref: React.ForwardedRef<HTMLHeadingElement>,
) {
  const {
    ref: modalRef,
    animationState,
    changeVisibility,
    isVisible,
  } = useOutsideClick(300);

  const { authData, data, mutate } = useLike('content', cinene?._id);

  const handleMutate = () => {
    if (!authData?.success) return changeVisibility();
    mutate({ type: 'contentId', id: cinene?._id });
  };

  const handleMoveToReview = () => {
    if (typeof ref === 'object') {
      // eslint-disable-next-line react/destructuring-assignment
      ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    console.log(cinene);
  }, [cinene]);

  return (
    <ButtonWrapper color="navy50">
      <Button type="button" onClick={handleMoveToReview}>
        리뷰 {cinene?.count}
      </Button>
      <Button
        type="button"
        isActive={data?.isLike}
        isZero={!data?.likes}
        onClick={handleMutate}
      >
        <Heart /> {data?.likes ?? '0'}
      </Button>
      {isVisible && (
        <LoginPortal
          closeFn={changeVisibility}
          isVisible={animationState}
          ref={modalRef}
        />
      )}
    </ButtonWrapper>
  );
}

export default forwardRef(LikeButton);

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0 1em;
  margin-top: 1rem;
  button {
    ${buttonEffect};
  }
`;
