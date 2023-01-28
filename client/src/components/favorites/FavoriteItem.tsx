import { Link } from 'react-router-dom';
import { IMAGE_URL } from 'services/media';
import styled from 'styled-components';

interface IProps {
  item: IFavoritesContent;
}

export default function FavoriteItem({ item }: IProps) {
  return (
    <FavoriteItemWrapper key={item._id}>
      <Link to={`/${item.contentId.type}/${item.contentId.tmdbId}`}>
        <img
          src={`${IMAGE_URL}/w200/${item.contentId.poster}`}
          alt={item.contentId.name}
        />
        {item.contentId.name}
      </Link>
    </FavoriteItemWrapper>
  );
}

const FavoriteItemWrapper = styled.li`
  img {
    height: 150px;
    border-radius: 10px;
  }

  & + & {
    margin-top: 1em;
  }
`;
