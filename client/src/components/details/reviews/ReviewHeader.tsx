import styled from 'styled-components';

import useOutsideClick from 'hooks/useOutsideClick';
import LoginPortal from 'components/common/LoginPortal';

interface IProps {
  changeVisibility: () => void;
  data?: IAuthData;
  hasReview: null | IDocument | undefined;
}

export default function ReviewItem({
  changeVisibility,
  data,
  hasReview,
}: IProps) {
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

  const getButtonComment = () => {
    if (!data?.success) return '로그인 후 리뷰를 작성할 수 있습니다.';
    if (hasReview) return '작성된 리뷰가 있습니다. 수정하기';
    return '작성된 리뷰가 없습니다. 리뷰를 작성해 주세요.';
  };

  return (
    <ReviewItemWrapper>
      <Default hasReview={!!hasReview} type="button" onClick={handleClick}>
        {getButtonComment()}
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

const Default = styled.button<{ hasReview: boolean }>`
  background-color: ${({ theme }) => theme.colors.navy50};
  border: ${({ theme, hasReview }) =>
    `1px solid ${hasReview ? theme.colors.pink : theme.colors.navy50}`};
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.gray500};
  font-size: 0.75rem;
  padding: 1em 1.5em;
  &:hover {
    border: ${({ theme }) => `1px solid ${theme.colors.pink}`};
  }
`;
