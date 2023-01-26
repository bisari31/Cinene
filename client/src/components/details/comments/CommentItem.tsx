import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { IComment } from 'types/comment';
import { USER_IMAGE } from 'utils/imageUrl';
import { Button, buttonEffect } from 'styles/css';
import { changeDaysAgo } from 'utils/days';

import ReplyComments from './ReplyComments';
import CommentLikeButton from './CommentLikeButton';

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
          <CommentLikeButton commentId={commentItem?._id} />
          {!isResponse && (
            <Button
              dataLength={ReplyData?.length}
              type="button"
              onClick={() => setOpenReplyComment((prev) => !prev)}
            >
              답글
            </Button>
          )}
        </ButtonWrapper>
      </Item>
      {openReplyComment && (
        <ReplyComments comments={ReplyData} responseId={commentItem?._id} />
      )}
    </>
  );
}

const Item = styled.div<{ date: string; isResponse: boolean }>`
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
      p:first-child {
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
`;
