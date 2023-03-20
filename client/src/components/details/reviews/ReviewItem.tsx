import { Star } from 'assets';
import useGetRelativeTime from 'hooks/useRelativeTime';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';

import { deleteReview } from 'services/review';
import { USER_IMAGE } from 'utils/imageUrl';
import { cineneKeys } from 'utils/keys';
import { useCurrentPathName } from 'hooks';

import { Content, Item } from '../comments/CommentItem';

interface Props {
  onClick: () => void;
  review: Review;
  auth: User | null;
}

export default function ReviewItem({ review, auth, onClick }: Props) {
  const { author, comment, rating, createdAt, updatedAt, _id } = review;
  const { id, path } = useCurrentPathName();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(deleteReview, {
    onSuccess: () => queryClient.invalidateQueries(cineneKeys.detail(path, id)),
  });

  const handleDelete = () => mutate(_id);

  return (
    <Item>
      <img src={author.img || USER_IMAGE} alt="user_avatar" />
      <Content date={useGetRelativeTime(createdAt, updatedAt)}>
        <div>
          <p>{author.nickname}</p>
          {author._id === auth?._id && (
            <>
              <button type="button" onClick={onClick}>
                수정
              </button>
              <button type="button" onClick={handleDelete}>
                삭제
              </button>
            </>
          )}
        </div>
        <p>{comment}</p>
      </Content>
      <SvgWrapper>
        {[1, 2, 3, 4, 5].map((star) => (
          <StyledButton
            isFilling={star <= rating}
            key={star}
            type="button"
            disabled
          >
            <Star />
          </StyledButton>
        ))}
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
