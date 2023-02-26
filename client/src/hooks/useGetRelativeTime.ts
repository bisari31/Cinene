import dayjs from 'dayjs';
import { useMemo } from 'react';

interface TimeUnit {
  shorthand: 's' | 'm' | 'h' | 'd' | 'w' | 'M' | 'y';
  name: string;
  calculation: number;
}

const TIME_UNITS: TimeUnit[] = [
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
  {
    shorthand: 'y',
    name: '년 전',
    calculation: 0,
  },
];

export default function useGetRelativeTime(
  createdAt?: string,
  updatedAt?: string,
) {
  return useMemo(() => {
    const updated = updatedAt ? ' (수정됨)' : '';
    const today = dayjs();
    let result = '';
    // eslint-disable-next-line no-restricted-syntax
    for (const item of TIME_UNITS) {
      const diff = today.diff(createdAt, item.shorthand);
      if (diff < item.calculation) {
        result = item.shorthand === 's' ? item.name : diff + item.name;
        break;
      }
      result = diff + item.name;
    }
    return result + updated;
  }, [createdAt, updatedAt]);
}
