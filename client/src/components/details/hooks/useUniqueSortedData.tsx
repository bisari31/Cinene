type Data = Results | CombinedCreditsCastAndCrew;

export default function useUniqueSortedData(data?: Data[]) {
  const deduplicated = data?.reduce((acc: Data[], cur: Data) => {
    if (!acc.some((item) => item.id === cur.id)) {
      acc.push(cur);
    }
    return acc;
  }, []);

  const sorted = deduplicated?.sort((a, b) => {
    const sortA = new Date(
      'first_air_date' in a ? a.first_air_date : a.release_date,
    ).getTime();
    const sortB = new Date(
      'first_air_date' in b ? b.first_air_date : b.release_date,
    ).getTime();
    return sortB - sortA;
  });

  return sorted;
}
