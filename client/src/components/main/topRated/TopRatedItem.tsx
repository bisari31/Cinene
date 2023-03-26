import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { useImageUrl } from 'hooks/cinene';

interface Props {
  item: CineneData | MovieResult;
}

export default function TopRatedItem({ item }: Props) {
  const { getImageUrl } = useImageUrl();
  const img = 'poster_url' in item ? item.poster_url : item.poster_path;
  const link =
    'id' in item ? `movie/${item.id}` : `${item.content_type}/${item.tmdbId}`;

  return (
    <List>
      <Link to={link} draggable="false">
        <img draggable="false" src={getImageUrl(img, '300')} alt={item.title} />
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
