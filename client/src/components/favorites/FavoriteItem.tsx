import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';

import { IMAGE_URL } from 'services/media';
import { Heart } from 'assets';
import { buttonEffect } from 'styles/css';
import { EMPTY_IMAGE, USER_IMAGE } from 'utils/imageUrl';
import { upLike } from 'services/like';

interface IProps {
  item: IFavoritesContent;
}

export default function FavoriteItem({ item }: IProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(upLike, {
    onMutate: async (data) => {
      await queryClient.cancelQueries(['favorites']);
      const previousData = queryClient.getQueryData<IFavoritesData>([
        'favorites',
      ]);
      if (previousData) {
        queryClient.setQueryData<IFavoritesData>(['favorites'], {
          ...previousData,
          contents: previousData.contents.filter(
            (content) => content.contentId._id !== data.id,
          ),
        });
      }
      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData)
        queryClient.setQueryData(['favorites'], context.previousData);
    },
    onSettled: () => queryClient.invalidateQueries(['favorites']),
  });

  const handleClickButton = (id: string) => {
    mutate({ type: 'contentId', id });
  };

  const checkEmptyImageUrl = (content: IFavoritesContent) => {
    if (content.contentId.poster) {
      return `${IMAGE_URL}/w400/${content.contentId.poster}`;
    }
    return content.contentId.type === 'person' ? USER_IMAGE : EMPTY_IMAGE;
  };

  return (
    <FavoriteItemWrapper key={item._id}>
      <Link to={`/${item.contentId.type}/${item.contentId.tmdbId}`}>
        <img src={checkEmptyImageUrl(item)} alt={item.contentId.name} />
        <span>{item.contentId.name}</span>
      </Link>
      <Button
        color="navy50"
        type="button"
        onClick={() => handleClickButton(item.contentId._id)}
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
      object-fit: cover;
      height: 100%;
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
  height: 30px;
  justify-content: center;
  left: 1em;
  position: absolute;
  top: 1em;
  width: 30px;
  svg {
    fill: ${({ theme }) => theme.colors.pink};
    height: 25px;
    stroke: none;
    width: 25px;
  }
  ${buttonEffect};
`;
