import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { IMAGE_URL } from 'services/media';

interface IProps {
  item: IFavoritesContent;
}

export default function FavoriteItem({ item }: IProps) {
  return (
    <FavoriteItemWrapper key={item._id}>
      <Link to={`/${item.contentId.type}/${item.contentId.tmdbId}`}>
        <img
          src={`${IMAGE_URL}/w400/${item.contentId.poster}`}
          alt={item.contentId.name}
        />
        <span>{item.contentId.name}</span>
      </Link>
    </FavoriteItemWrapper>
  );
}

const FavoriteItemWrapper = styled.li`
  display: flex;
  a {
    position: relative;
    img {
      border-radius: 10px;
      height: 200px;
    }
    span {
      text-align: right;
      background-color: rgba(0, 0, 0, 0.7);
      bottom: 1.5em;
      display: none;
      font-size: 18px;
      border-radius: 10px;
      padding: 0.4em;
      right: 1em;
      position: absolute;
    }
    &:hover {
      span {
        display: block;
      }
    }
  }
  @media ${({ theme }) => theme.device.tablet} {
    a {
      img {
        height: 350px;
      }
    }
  }
`;
