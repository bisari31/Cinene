import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { getFavorites } from 'services/like';

import Toggle from './Toggle';
import FavoriteItem from './FavoriteItem';

interface IProps {
  data?: {
    success: boolean;
    user?: IUser;
  };
}

export default function Favorites({ data }: IProps) {
  const [selectedType, setSelectedType] = useState(1);
  const [newFavoritesData, setNewFavoritesData] =
    useState<IFavoritesContent[]>();

  const { data: favoritesData } = useQuery(
    ['favorites', data?.user?._id],
    getFavorites,
    {
      enabled: data?.success,
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    setNewFavoritesData(
      favoritesData?.contents.filter((item) =>
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
  width: 100%;
  ul {
    align-items: center;
    display: grid;
    gap: 1em;
    grid-template-columns: repeat(2, 50%);
    margin-top: 2em;
  }
  @media ${({ theme }) => theme.device.tablet} {
    ul {
      grid-template-columns: repeat(4, 25%);
    }
  }
`;
