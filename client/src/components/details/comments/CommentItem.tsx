import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { IComment } from 'types/comment';
import { USER_IMAGE } from 'utils/imageUrl';
import { Button, buttonEffect } from 'styles/css';
import { Heart } from 'assets';
import { useGetRelativeTime, useLike, useOutsideClick } from 'hooks';

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
      <Item key={commentItem?._id} isResponse={isResponse}>
        <img src={USER_IMAGE} alt="user_poster" />
        <Content date={useGetRelativeTime(commentItem?.createdAt)}>
          <div>
            <p>{commentItem?.userId.nickname}</p>
            {/* <button type="button">수정</button>
            <button type="button">삭제</button> */}
          </div>
          <p>{commentItem?.comment}</p>
        </Content>
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

export const Item = styled.div<{ isResponse?: boolean }>`
  ${({ theme }) => css`
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

    & + & {
      margin-top: 1em;
    }
  `}
`;

export const Content = styled.div<{ date: string }>`
  ${({ theme, date }) => css`
    flex: 1;
    line-height: 1.2;
    word-break: break-all;
    div {
      display: flex;
      align-items: center;
      margin-bottom: 0.3em;
      p {
        font-size: 0.9rem;
        font-weight: 500;
        &::after {
          color: ${theme.colors.gray500};
          content: '${date && date}';
          font-size: 0.8rem;
          margin-left: 0.4em;
          margin-right: 0.7em;
        }
      }
      button {
        padding: 0;
        font-size: 0.78rem;
        height: 15px;
        color: ${theme.colors.gray300};
        background: none;
        border: none;
      }
      button + button {
        margin-left: 0.5em;
      }
    }
    & > p {
      color: ${theme.colors.gray300};
      font-size: 0.9rem;
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
