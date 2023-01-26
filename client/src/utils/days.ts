import dayjs from 'dayjs';

interface IDays {
  shorthand: 's' | 'm' | 'h' | 'd' | 'w' | 'M';
  name: string;
  calculation: number;
}

export const changeCreatedAt = (date?: string) => {
  const now = dayjs().format('YYMMDD');
  const d = dayjs(date);
  if (now === d.format('YYMMDD')) {
    return d.format('HH:mm');
  }
  return d.format('YYYY.MM.DD');
};

export const changeDaysAgo = (date?: string) => {
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
