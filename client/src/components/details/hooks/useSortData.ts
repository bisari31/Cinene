import { useMemo } from 'react';

export default function useSortData(array?: CombinedCreditsCastAndCrew[]) {
  const sortData = useMemo(() => {
    const removedDuplication = array?.reduce(
      (acc: CombinedCreditsCastAndCrew[], cur: CombinedCreditsCastAndCrew) => {
        if (acc.findIndex((item) => item.id === cur.id) === -1) {
          acc.push(cur);
        }
        return acc;
      },
      [],
    );

    const sorted = removedDuplication?.sort((a, b) => {
      const sortA = new Date(
        'first_air_date' in a ? a.first_air_date : a.release_date,
      ).getTime();
      const sortB = new Date(
        'first_air_date' in b ? b.first_air_date : b.release_date,
      ).getTime();
      return sortB - sortA;
    });

    return sorted;
  }, [array]);

  return sortData;
}
