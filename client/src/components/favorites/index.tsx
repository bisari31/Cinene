import { useEffect } from 'react';
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
  const { data: favoritesData } = useQuery(
    ['favorites', data?.user?._id],
    getFavorites,
    {
      enabled: data?.success,
    },
  );

  useEffect(() => {
    console.log(favoritesData);
  }, [favoritesData]);

  return (
    <FavoritesWrapper>
      <Toggle />
      <ul>
        {favoritesData?.contents.map((item) => (
          <FavoriteItem key={item._id} item={item} />
        ))}
      </ul>
    </FavoritesWrapper>
  );
}

const FavoritesWrapper = styled.div`
  ul {
    margin-top: 1em;
  }
`;
