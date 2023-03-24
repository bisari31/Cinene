import styled from 'styled-components';

import Toggle from './Toggle';
import FavoriteItem from './FavoriteItem';
import useFavorites from './hooks/useFavorites';

export default function Favorites() {
  const { data, selectedType, setSelectedType } = useFavorites();
  return (
    <FavoritesWrapper>
      <Toggle selectedType={selectedType} setSelectedType={setSelectedType} />
      <ul>
        {data?.map((item) => (
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
