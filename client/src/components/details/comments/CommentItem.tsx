import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import styled, { css } from 'styled-components';

import { IComment } from 'types/comment';
import { USER_IMAGE } from 'utils/imageUrl';
import { Favorite } from 'assets';
import { buttonEffect } from 'styles/css';

import ReplyComments from './ReplyComments';

interface IDays {
  shorthand: 's' | 'm' | 'h' | 'd' | 'w' | 'M';
  name: string;
  calculation: number;
}

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

  const setDate = (date?: string) => {
    const today = dayjs();
    const daysArray: IDays[] = [
      {
        shorthand: 's',
        name: '방금 전',
        calculation: 60,
      },
      {
        shorthand: 'm',
        name: '분 전',
        calculation: 60,
      },
      {
        shorthand: 'h',
        name: '시간 전',
        calculation: 24,
      },
      {
        shorthand: 'd',
        name: '일 전',
        calculation: 7,
      },
      {
        shorthand: 'w',
        name: '주 전',
        calculation: 4,
      },
      {
        shorthand: 'M',
        name: '달 전',
        calculation: 12,
      },
    ];
    // eslint-disable-next-line no-restricted-syntax
    for (const item of daysArray) {
      const diff = today.diff(date, item.shorthand);
      if (diff < item.calculation)
        return item.shorthand === 's' ? item.name : `${diff}${item.name}`;
    }
    return `${today.diff(date, 'y')} 년 전`;
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
        date={setDate(commentItem?.createdAt)}
        isResponse={isResponse}
      >
        <img src={USER_IMAGE} alt="user_poster" />
        <div>
          <p>{commentItem?.userId.nickname}</p>
          <p>{commentItem?.comment}</p>
        </div>
        <ButtonWrapper color="navy50">
          <Button type="button">
            <Favorite />
          </Button>
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
  svg {
    height: 16px;
    stroke: ${({ theme }) => theme.colors.red};
    stroke-width: 2;
    width: 16px;
  }
`;

const Button = styled.button<{ dataLength?: number }>`
  ${({ theme, dataLength }) => css`
    align-items: center;
    background: none;
    border: none;
    border-radius: 10px;
    color: ${theme.colors.gray100};
    display: flex;
    font-size: 0.8rem;
    padding: 0.5em;
    &::after {
      color: ${theme.colors.gray300};
      content: '${dataLength ? `${dataLength}` : '0'}';
      margin-left: 0.3em;
    }
  `}
`;
