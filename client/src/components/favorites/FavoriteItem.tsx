import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';

import { Heart } from 'assets';
import { buttonEffect } from 'styles/css';
import { upLike } from 'services/like';
import { IMAGE_URL } from 'services/tmdb';
import { EMPTY_IMAGE, USER_IMAGE } from 'utils/imageUrl';
import { cineneKeys } from 'utils/keys';

interface IProps {
  item: IFavoritesContent;
}

export default function FavoriteItem({ item }: IProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(upLike, {
    onMutate: async (data) => {
      await queryClient.cancelQueries(cineneKeys.favorites());
      const previousData = queryClient.getQueryData<IFavoritesData>(
        cineneKeys.favorites(),
      );
      if (previousData) {
        queryClient.setQueryData<IFavoritesData>(cineneKeys.favorites(), {
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
        queryClient.setQueryData(cineneKeys.favorites(), context.previousData);
    },
    onSettled: () => queryClient.invalidateQueries(cineneKeys.favorites()),
  });

  const getImageUrl = (content?: ICineneData) => {
    if (!content) return;
    const { type, poster } = content;
    if (poster) {
      return `${IMAGE_URL}/w400/${poster}`;
    }
    return type === 'person' ? USER_IMAGE : EMPTY_IMAGE;
  };

  const handleClickButton = (id: string) => {
    mutate({ type: 'contentId', id });
  };

  return (
    <FavoriteItemWrapper key={item._id}>
      <Link to={`/${item.contentId.type}/${item.contentId.tmdbId}`}>
        <img src={getImageUrl(item.contentId)} alt={item.contentId.name} />
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
  position: relative;
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
