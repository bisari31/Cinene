import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Slider from 'components/common/Slider';
import useSimilarQuery from 'components/details/hooks/useSimilarQuery';
import useUniqueSortedData from 'components/details/hooks/useUniqueSortedData';
import useImageUrl from 'hooks/cinene/useImageUrl';

interface Props {
  path: MediaType;
  id: number;
  type?: 'crew' | 'cast';
}

export default function SimilarMedia({ id, path, type }: Props) {
  const { filmographyData, similarData } = useSimilarQuery(id, path, type);
  const data = useUniqueSortedData(
    type && filmographyData ? filmographyData[type] : similarData,
  );
  const { getImageUrl } = useImageUrl();

  const getTitle = () => {
    if (path === 'movie') {
      return '추천 영화';
    }
    if (path === 'tv') {
      return '추천 시리즈';
    }
    return type === 'cast' ? '출연 작품' : '제작 작품';
  };
  const title = getTitle();

  if (!data?.length) return null;

  return (
    <div>
      <Slider title={title}>
        {data?.map((item) => (
          <List key={item.id}>
            <Link
              to={`/${item.media_type ?? path}/${item.id}`}
              draggable="false"
            >
              <img
                draggable="false"
                src={getImageUrl(item.poster_path, '200')}
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
