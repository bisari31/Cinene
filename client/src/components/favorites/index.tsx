import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { getFavorites } from 'services/like';

import Toggle from './Toggle';
import FavoriteItem from './FavoriteItem';

interface IProps {
  data?: IAuthData;
}

export default function Favorites({ data }: IProps) {
  const [selectedType, setSelectedType] = useState(1);

  const [newFavoritesData, setNewFavoritesData] =
    useState<IFavoritesContent[]>();

  const { data: favoritesData } = useQuery(['favorites'], getFavorites, {
    enabled: data?.success,
  });

  useEffect(() => {
    setNewFavoritesData(
      favoritesData?.contents?.filter((item) =>
        selectedType === 1
          ? item.contentId.type !== 'person'
          : item.contentId.type === 'person',
      ),
    );
  }, [selectedType, favoritesData]);

  return (
    <FavoritesWrapper>
      <Toggle selectedType={selectedType} setSelectedType={setSelectedType} />
      <ul>
        {newFavoritesData?.map((item) => (
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
