import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useMutation } from 'react-query';

import { Heart } from 'assets';
import { buttonEffect } from 'styles/css';
import { useImageUrl, useLoginPortal, useMutationOptions } from 'hooks/cinene';
import { like } from 'services/like';
import { cineneKeys } from 'utils/queryOptions';

interface Props {
  data: CineneData;
}

export default function FavoriteItem({ data }: Props) {
  const { openPortal, renderPortal } = useLoginPortal();
  const { errorHandler, queryClient } = useMutationOptions(openPortal);
  const { getImageUrl } = useImageUrl();

  const { mutate } = useMutation(like, {
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries(cineneKeys.favorites());
      const previousData = queryClient.getQueryData<FavoritesData>(
        cineneKeys.favorites(),
      );
      if (previousData) {
        queryClient.setQueryData(cineneKeys.favorites(), {
          ...previousData,
          contents: previousData.contents.filter(
            ({ content }) => content._id !== id,
          ),
        });
      }
      return { previousData };
    },
    onError: (err: AxiosError, variables, context) => {
      errorHandler(err);
      if (context?.previousData) {
        queryClient.setQueryData(cineneKeys.favorites(), context.previousData);
      }
    },
    onSettled: () => queryClient.invalidateQueries(cineneKeys.favorites()),
  });

  return (
    <StyledLi>
      <Link to={`/${data.content_type}/${data.tmdbId}`}>
        <img
          src={getImageUrl(
            data.poster_url,
            '400',
            data.content_type === 'person',
          )}
          alt={data.title}
        />
        <span>{data.title}</span>
      </Link>
      <StyledButton
        color="navy50"
        type="button"
        onClick={() => mutate({ type: 'content', id: data._id })}
      >
        <Heart />
      </StyledButton>
      {renderPortal()}
    </StyledLi>
  );
}

const StyledLi = styled.li`
  display: flex;
  position: relative;
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

const StyledButton = styled.button`
  align-content: center;
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
    height: 100%;
    stroke: none;
    width: 100%;
  }
  ${buttonEffect};
`;
