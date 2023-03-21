import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Heart } from 'assets';
import { buttonEffect } from 'styles/css';
import { IMAGE_URL } from 'services/tmdb';
import { EMPTY_IMAGE, USER_IMAGE } from 'utils/imageUrl';
import useLikeMutation from 'hooks/queries/useLikeMutation';

interface Props {
  item: FavoritesContent;
}

export default function FavoriteItem({ item }: Props) {
  const { content, _id } = item;
  const mutate = useLikeMutation();

  const getImageUrl = (data: CineneData) => {
    const { content_type: type, poster_url: poster } = data;
    if (poster) return `${IMAGE_URL}/w400/${poster}`;
    return type === 'person' ? USER_IMAGE : EMPTY_IMAGE;
  };

  const handleClickButton = (id: string) => mutate({ type: 'content', id });

  return (
    <FavoriteItemWrapper key={_id}>
      <Link to={`/${content.content_type}/${content.tmdbId}`}>
        <img src={getImageUrl(content)} alt={content.title} />
        <span>{content.title}</span>
      </Link>
      <Button
        color="navy50"
        type="button"
        onClick={() => handleClickButton(content._id)}
      >
        <Heart />
      </Button>
    </FavoriteItemWrapper>
  );
}

const FavoriteItemWrapper = styled.li`
  display: flex;
  height: 100%;
  position: relative;
  width: 100%;
  a {
    height: 100%;
    width: 100%;
    img {
      border-radius: 10px;
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
    span {
      background-color: rgba(0, 0, 0, 0.7);
      border-radius: 10px;
      bottom: 1.5em;
      display: none;
      font-size: 18px;
      max-width: 80%;
      padding: 0.3em;
      position: absolute;
      right: 0.8em;
      text-align: right;
      word-break: break-all;
    }
    &:hover {
      span {
        display: inline-block;
      }
    }
  }
  @media ${({ theme }) => theme.device.tablet} {
  }
`;

const Button = styled.button`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.navy50};
  border: none;
  border-radius: 10px;
  display: flex;
  height: 13%;
  justify-content: center;
  left: 14px;
  max-height: 40px;
  max-width: 40px;
  position: absolute;
  top: 14px;
  width: 20%;
  svg {
    fill: ${({ theme }) => theme.colors.pink};
    height: 90%;
    stroke: none;
    width: 90%;
  }
  ${buttonEffect};
`;
