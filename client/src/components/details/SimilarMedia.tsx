import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { EMPTY_IMAGE } from 'utils/imageUrl';
import { IMAGE_URL } from 'services/tmdb';

import Slider from 'components/common/Slider';

interface Props {
  data?: Results[];
  path?: string;
  title: string;
}

export default function SimilarMedia({ data, title, path }: Props) {
  return (
    <div>
      <Slider title={title}>
        {data?.map((item) => (
          <List key={item.id}>
            <Link
              to={`/${path ?? item.media_type}/${item.id}`}
              draggable="false"
            >
              <img
                draggable="false"
                src={
                  item.poster_path
                    ? `${IMAGE_URL}/w200/${item.poster_path}`
                    : EMPTY_IMAGE
                }
                alt={'title' in item ? item.title : item.name}
              />
              <p>{'title' in item ? item.title : item.name}</p>
            </Link>
          </List>
        ))}
      </Slider>
    </div>
  );
}

const List = styled.li`
  img {
    border-radius: 30px;
    height: 200px;
    width: 140px;
  }

  p {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 1.4;
    display: -webkit-box;
    overflow: hidden;
    white-space: normal;
    font-size: 0.9rem;
    width: 140px;
    margin-top: 0.7em;
  }
  & + & {
    padding-left: 1.5em;
  }
`;
