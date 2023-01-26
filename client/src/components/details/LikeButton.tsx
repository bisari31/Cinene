import styled from 'styled-components';

import { Heart } from 'assets';
import { IContent } from 'services/contents';
import { Button, buttonEffect } from 'styles/css';
import useOutsideClick from 'hooks/useOutsideClick';
import useLike from 'hooks/useLike';

import LoginPortal from 'components/common/LoginPortal';

interface IProps {
  cinene: IContent | null | undefined;
}

export default function LikeButton({ cinene }: IProps) {
  const { ref, animationState, handleChangeVisibility, isVisible } =
    useOutsideClick(300);

  const { authData, data, mutate } = useLike('content', cinene?._id);

  const handleClick = () => {
    if (!authData?.success) return handleChangeVisibility();
    mutate({ type: 'contentId', id: cinene?._id });
  };

  return (
    <ButtonWrapper color="navy50">
      <Button type="button">리뷰 {cinene?.count}</Button>
      <Button
        type="button"
        isActive={data?.isLike}
        isZero={!data?.likes}
        onClick={handleClick}
      >
        <Heart /> {data?.likes ?? '0'}
      </Button>
      {isVisible && (
        <LoginPortal
          closeFn={handleChangeVisibility}
          isVisible={animationState}
          refElement={ref}
        />
      )}
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0 1em;
  margin-top: 1rem;
  button {
    ${buttonEffect};
  }
`;
