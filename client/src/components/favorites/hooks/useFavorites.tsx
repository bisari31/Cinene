import { useQuery } from 'react-query';
import { useState } from 'react';

import { getFavorites } from 'services/like';
import { cineneKeys } from 'utils/keys';

import useAuthQuery from 'components/header/hooks/useAuthQuery';

export default function useFavorites() {
  const { auth, setAuth } = useAuthQuery();
  const [selectedType, setSelectedType] = useState(0);

  const { data } = useQuery(cineneKeys.favorites(), getFavorites, {
    enabled: !!auth,
    onError: ({ response }: AxiosError) => {
      if (response.status === 401) {
        setAuth(null);
      }
    },
  });

  const selectData = () =>
    data?.contents?.filter(({ content: { content_type: type } }) =>
      selectedType === 0 ? type !== 'person' : type === 'person',
    );
  const seletedData = selectData();

  return { data: seletedData, selectedType, setSelectedType };
}
