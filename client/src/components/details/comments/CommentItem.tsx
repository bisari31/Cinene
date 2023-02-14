import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { IComment } from 'types/comment';
import { USER_IMAGE } from 'utils/imageUrl';
import { Button, buttonEffect } from 'styles/css';
import { changeDaysAgo } from 'utils/days';
import { Heart } from 'assets';
import useOutsideClick from 'hooks/useOutsideClick';
import useLike from 'hooks/useLike';

import LoginPortal from 'components/common/LoginPortal';
import ReplyComments from './ReplyComments';

interface IProps {
  comments?: IComment[];
  commentItem: IComment | undefined;
  isResponse?: boolean;
}

export default function CommentItem({
  commentItem,
  comments,
  isResponse = false,
}: IProps) {
  const [ReplyData, setReplyData] = useState<IComment[]>();
  const [openReplyComment, setOpenReplyComment] = useState(false);

  const { ref, animationState, changeVisibility, isVisible } =
    useOutsideClick(300);

  const { authData, data, mutate } = useLike('comments', commentItem?._id);

  const handleClick = () => {
    if (!authData?.success) return changeVisibility();
    mutate({ type: 'commentId', id: commentItem?._id });
  };

  useEffect(() => {
    setReplyData(
      comments?.filter((item) => item.responseTo === commentItem?._id),
    );
  }, [comments, commentItem]);

  return (
    <>
      <Item
        key={commentItem?._id}
        date={changeDaysAgo(commentItem?.createdAt)}
        isResponse={isResponse}
      >
        <img src={USER_IMAGE} alt="user_poster" />
        <div>
          <p>{commentItem?.userId.nickname}</p>
          <p>{commentItem?.comment}</p>
        </div>
        <ButtonWrapper color="navy50">
          <Button
            isZero={!data?.likes}
            type="button"
            onClick={handleClick}
            isActive={data?.isLike}
          >
            <Heart /> {data?.likes ?? '0'}
          </Button>
          {!isResponse && (
            <Button
              isActive={openReplyComment}
              type="button"
              onClick={() => setOpenReplyComment((prev) => !prev)}
            >
              답글 {ReplyData?.length}
            </Button>
          )}
        </ButtonWrapper>
      </Item>
      {openReplyComment && (
        <ReplyComments comments={ReplyData} responseId={commentItem?._id} />
      )}
      {isVisible && (
        <LoginPortal
          closeFn={changeVisibility}
          isVisible={animationState}
          ref={ref}
        />
      )}
    </>
  );
}

export const Item = styled.div<{ date: string; isResponse?: boolean }>`
  ${({ theme, date }) => css`
    align-items: center;
    background-color: ${theme.colors.navy50};
    border-radius: 10px;
    display: flex;
    padding: 1em;
    img {
      margin-right: 1em;
      border-radius: 50%;
      height: 40px;
      width: 40px;
    }
    div:nth-child(2) {
      flex: 1;
      word-break: break-all;
      line-height: 1.2;
      p:nth-of-type(1) {
        font-size: 0.9rem;
        font-weight: 500;
        margin-bottom: 0.3em;
        &::after {
          color: ${theme.colors.gray500};
          font-size: 0.8rem;
          margin-left: 0.4em;
          content: '${date && date}';
        }
      }
      p:last-child {
        font-size: 0.9rem;
        color: ${theme.colors.gray300};
      }
    }

    & + & {
      margin-top: 1em;
    }
  `}
`;

const ButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  button {
    ${buttonEffect};
  }
  button + button {
    margin-left: 0.5em;
  }
`;
