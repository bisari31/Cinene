import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { getFavorites } from 'services/like';
import { cineneKeys } from 'utils/keys';

import Toggle from './Toggle';
import FavoriteItem from './FavoriteItem';

interface Props {
  auth: User | null;
  setAuth: React.Dispatch<React.SetStateAction<User | null>>;
}

export default function Favorites({ auth, setAuth }: Props) {
  const [selectedType, setSelectedType] = useState(0);

  const { data: favoritesData } = useQuery(
    cineneKeys.favorites(),
    getFavorites,
    {
      enabled: !!auth,
      retry: 1,
      onError: ({ response }: AxiosError) => {
        if (response.status === 401) {
          setAuth(null);
        }
      },
    },
  );

  const selectedData = useMemo(
    () =>
      favoritesData?.contents.filter(({ content: { content_type: type } }) =>
        selectedType === 0 ? type !== 'person' : type === 'person',
      ),
    [favoritesData?.contents, selectedType],
  );

  return (
    <FavoritesWrapper>
      <Toggle selectedType={selectedType} setSelectedType={setSelectedType} />
      <ul>
        {selectedData?.map((item) => (
          <FavoriteItem key={item._id} data={item.content} />
        ))}
      </ul>
    </FavoritesWrapper>
  );
}

const FavoritesWrapper = styled.div`
  ul {
    align-items: center;
    display: grid;
    gap: 2em;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 4em;
    margin-top: 2em;
  }
  @media ${({ theme }) => theme.device.laptop} {
    ul {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;
