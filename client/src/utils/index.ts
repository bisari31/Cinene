import dayjs from 'dayjs';

export const changeCreatedAt = (date?: string) => {
  const now = dayjs().format('YYMMDD');
  const d = dayjs(date);
  if (now === d.format('YYMMDD')) {
    return d.format('HH:mm');
  }
  return d.format('YYYY.MM.DD');
};
