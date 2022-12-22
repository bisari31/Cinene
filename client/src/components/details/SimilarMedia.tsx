import { useState, useRef, useEffect } from 'react';

import styled from 'styled-components';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { getSimilarMedia, IMAGE_URL } from 'services/media';
import useCurrentPathName from 'hooks/useCurrentPathName';
import Slider from 'components/common/Slider';
import { EMPTY_IMAGE } from 'utils/imageUrl';

export default function SimilarMedia() {
  const { id, path } = useCurrentPathName();
  const { data } = useQuery([path, 'similar', id], () =>
    getSimilarMedia(id, path),
  );

  const setTitle = path === 'movie' ? '영화' : '시리즈';

  return (
    <SimilarMediaWrapper>
      <Slider title={`추천 ${setTitle}`}>
        {data?.map((media) => (
          <List key={media.id}>
            <Link to={`/${path}/${media.id}`} draggable="false">
              <img
                draggable="false"
                src={
                  media.poster_path
                    ? `${IMAGE_URL}/w200/${media.poster_path}`
                    : EMPTY_IMAGE
                }
                alt={media.name || media.title}
              />
              <p>{media.name || media.title}</p>
            </Link>
          </List>
        ))}
      </Slider>
    </SimilarMediaWrapper>
  );
}

const SimilarMediaWrapper = styled.div``;

const List = styled.li`
  img {
    border-radius: 30px;
    height: 200px;
    width: 140px;
  }

  p {
    line-height: 1.4;
    font-size: 0.9rem;
    margin-top: 0.7em;
  }
  & + & {
    padding-left: 1.5em;
  }
`;
