import { Star } from 'assets';
import styled from 'styled-components';

import { USER_IMAGE } from 'utils/imageUrl';
import { changeDaysAgo } from 'utils/days';
import { Item } from '../Comments/CommentItem';

interface IProps {
  review: IDocument;
}

export default function ReviewItem({ review }: IProps) {
  return (
    <Item date={changeDaysAgo(review.createdAt)}>
      <img src={USER_IMAGE} alt="user_avatar" />
      <div>
        <p>{review.userId.nickname}</p>
        <p>{review.review}</p>
      </div>
      <SvgWrapper>
        {[1, 2, 3, 4, 5]
          .map((star) => (
            <StyledButton
              isFilling={star >= review.rating}
              key={star}
              type="button"
              disabled
            >
              <Star />
            </StyledButton>
          ))
          .reverse()}
      </SvgWrapper>
    </Item>
  );
}

const SvgWrapper = styled.div`
  align-items: center;
  display: flex;
`;

const StyledButton = styled.button<{ isFilling: boolean }>`
  background: none;
  border: none;
  padding: 0;
  width: 18px;
  &:hover {
    cursor: auto;
  }
  svg {
    fill: ${({ theme, isFilling }) =>
      isFilling ? theme.colors.yellow : theme.colors.navy};
    height: 100%;
    stroke: none;
    width: 100%;
  }
`;
