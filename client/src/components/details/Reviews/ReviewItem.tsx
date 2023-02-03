import styled from 'styled-components';

import { useAuthQuery } from 'hooks/useAuthQuery';
import useOutsideClick from 'hooks/useOutsideClick';
import LoginPortal from 'components/common/LoginPortal';

interface IProps {
  changeVisibility: () => void;
}

export default function ReviewItem({ changeVisibility }: IProps) {
  const { data } = useAuthQuery();

  const {
    animationState,
    changeVisibility: openLoginModal,
    isVisible,
    ref,
  } = useOutsideClick(300);

  const handleClick = () => {
    if (!data?.success) return openLoginModal();
    changeVisibility();
  };

  return (
    <ReviewItemWrapper>
      <Default type="button" onClick={handleClick}>
        {!data?.success
          ? '로그인 후 리뷰를 작성할 수 있습니다.'
          : '작성된 리뷰가 없습니다. 리뷰를 작성해 주세요.'}
      </Default>
      {isVisible && (
        <LoginPortal
          ref={ref}
          isVisible={animationState}
          closeFn={openLoginModal}
        />
      )}
    </ReviewItemWrapper>
  );
}

const ReviewItemWrapper = styled.div`
  margin: 2em 0;
`;

const Default = styled.button`
  background-color: ${({ theme }) => theme.colors.navy50};
  border: ${({ theme }) => `1px solid ${theme.colors.navy50}`};
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.gray500};
  font-size: 0.75rem;
  padding: 1em 1.5em;
  &:hover {
    border: ${({ theme }) => `1px solid ${theme.colors.pink}`};
  }
`;
