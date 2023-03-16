import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { IMAGE_URL } from 'services/tmdb';
import { EMPTY_IMAGE } from 'utils/imageUrl';

type Item = CineneData & MediaResults;

interface Props {
  item: Partial<Item>;
  type: 'cinene' | 'tmdb';
}

export default function TopRatedItem({ item, type }: Props) {
  const typeObj = {
    cinene: {
      link: `/${item.type}/${item.tmdbId}`,
      src: item.poster ? `${IMAGE_URL}/w500/${item.poster}` : EMPTY_IMAGE,
      alt: item.name,
    },
    tmdb: {
      link: `/movie/${item.id}`,
      src: item.poster_path
        ? `${IMAGE_URL}/w500/${item.poster_path}`
        : EMPTY_IMAGE,
      alt: item.title,
    },
  };

  return (
    <List>
      <Link to={typeObj[type].link} draggable="false">
        <img
          draggable="false"
          src={typeObj[type].src}
          alt={typeObj[type].alt}
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
