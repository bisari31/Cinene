import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { getFavorites } from 'services/like';

import { cineneKeys } from 'utils/keys';
import Toggle from './Toggle';
import FavoriteItem from './FavoriteItem';

interface Props {
  auth: User | null;
}

export default function Favorites({ auth }: Props) {
  const [selectedType, setSelectedType] = useState(1);

  const { data: favoritesData } = useQuery(
    cineneKeys.favorites(),
    getFavorites,
    {
      enabled: !!auth,
    },
  );

  const selectedData = useMemo(
    () =>
      favoritesData?.contents.filter((item) =>
        selectedType === 1
          ? item.contentId.type !== 'person'
          : item.contentId.type === 'person',
      ),
    [favoritesData?.contents, selectedType],
  );
  console.log(favoritesData);

  return (
    <FavoritesWrapper>
      <Toggle selectedType={selectedType} setSelectedType={setSelectedType} />
      <ul>
        {selectedData?.map((item) => (
          <FavoriteItem key={item._id} item={item} />
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
