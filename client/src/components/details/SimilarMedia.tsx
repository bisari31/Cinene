import { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { EMPTY_IMAGE } from 'utils/imageUrl';
import { IMAGE_URL } from 'services/media';

import Slider from 'components/common/Slider';

interface IProps {
  data: IMediaResults[] | undefined;
  title: string;
  type?: string;
}

export default function SimilarMedia({ data, title, type }: IProps) {
  if (!data?.length) return null;

  return (
    <SimilarMediaWrapper>
      <Slider title={title}>
        {data?.map((media) => (
          <List key={media.id}>
            <Link
              to={`/${type || media.media_type}/${media.id}`}
              draggable="false"
            >
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
