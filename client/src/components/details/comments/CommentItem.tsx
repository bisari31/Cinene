import dayjs from 'dayjs';
import styled, { css } from 'styled-components';

import { IComment } from 'types/comment';
import { USER_IMAGE } from 'utils/imageUrl';

interface IProps {
  comment?: IComment;
}

interface IDays {
  shorthand: 's' | 'm' | 'h' | 'd' | 'w' | 'M';
  name: string;
  calculation: number;
}

export default function CommentItem({ comment }: IProps) {
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

  if (comment?.responseTo) return null;

  return (
    <>
      <img src={USER_IMAGE} alt="user_image" />
      <TextBox date={setDate(comment?.createdAt)}>
        <span>{comment?.userId.nickname}</span>
        <span>{comment?.comment}</span>
      </TextBox>
    </>
  );
}

const TextBox = styled.div<{ date: string | undefined }>`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  span:nth-child(1) {
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 0.4em;
    &::after {
      margin-left: 0.5em;
      content: ${({ date }) => (date ? `'${date}'` : '')};
      font-weight: 400;
      font-size: 0.8rem;
      color: ${({ theme }) => theme.colors.gray500};
    }
  }
  span:nth-child(2) {
    color: ${({ theme }) => theme.colors.gray300};
    font-size: 0.8rem;
  }
`;
