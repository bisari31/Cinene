import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Heart } from 'assets';
import { buttonEffect } from 'styles/css';

import useLikeMutation from 'components/favorites/hooks/useLikeMutation';
import useImageUrl from 'components/details/hooks/useImageUrl';
import { useLoginPortal } from 'hooks';

interface Props {
  data: CineneData;
}

export default function Favoritecontent({ data }: Props) {
  const { openModal, renderPortal } = useLoginPortal();
  const mutate = useLikeMutation(openModal);
  const { getPoster } = useImageUrl();

  return (
    <FavoritecontentWrapper>
      <Link to={`/${data.content_type}/${data.tmdbId}`}>
        <img
          src={getPoster(
            data.poster_url,
            '400',
            data.content_type === 'person',
          )}
          alt={data.title}
        />
        <span>{data.title}</span>
      </Link>
      <Button
        color="navy50"
        type="button"
        onClick={() => mutate({ type: 'content', id: data._id })}
      >
        <Heart />
      </Button>
      {renderPortal()}
    </FavoritecontentWrapper>
  );
}

const FavoritecontentWrapper = styled.li`
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

const Button = styled.button`
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
