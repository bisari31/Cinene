import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { IMAGE_URL } from 'services/tmdb';
import { EMPTY_IMAGE } from 'utils/imageUrl';

interface Props {
  item: CineneData | MovieResult;
}

export default function TopRatedItem({ item }: Props) {
  const img = 'poster' in item ? item.poster : item.poster_path;
  const link =
    'id' in item ? `movie/${item.id}` : `${item.type}/${item.tmdbId}`;
  const title = 'name' in item ? item.name : item.title;

  return (
    <List>
      <Link to={link} draggable="false">
        <img
          draggable="false"
          src={img ? `${IMAGE_URL}/w500/${img}` : EMPTY_IMAGE}
          alt={title}
        />
      </Link>
    </List>
  );
}

const List = styled.li`
  ${({ theme }) => css`
    img {
      border-radius: 30px;
      height: 230px;
      object-fit: cover;
      width: 150px;
    }
    & + & {
      padding-left: 1.3em;
    }
    @media ${theme.device.tablet} {
      img {
        width: 200px;
        height: 300px;
      }
    }
  `}
`;
