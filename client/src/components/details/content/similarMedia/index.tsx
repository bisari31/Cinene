import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

import { queryOptions, tmdbKeys } from 'utils/queryOptions';
import { getFilmography, getSimilarMedia } from 'services/tmdb';
import { useImageUrl } from 'hooks/cinene';

import Slider from 'components/common/Slider';

type Data = Results | CombinedCreditsCastAndCrew;

interface Props {
  path: MediaType;
  id: number;
  type?: 'crew' | 'cast';
}

export default function SimilarMedia({ id, path, type }: Props) {
  const { getImageUrl } = useImageUrl();
  const { data: similarData } = useQuery(
    tmdbKeys.similar(path, id),
    () => getSimilarMedia(id, path),
    { ...queryOptions, enabled: !type },
  );

  const { data: filmographyData } = useQuery(
    tmdbKeys.filmography(path, id),
    () => getFilmography(id),
    {
      ...queryOptions,
      enabled: !!type,
    },
  );

  const deduplicateData = (data?: Data[]) =>
    data?.reduce((acc: Data[], cur: Data) => {
      if (!acc.some((item) => item.id === cur.id)) {
        acc.push(cur);
      }
      return acc;
    }, []);

  const sortData = (data?: Data[]) =>
    data?.sort((a, b) => {
      const sortA = new Date(
        'first_air_date' in a ? a.first_air_date : a.release_date,
      ).getTime();
      const sortB = new Date(
        'first_air_date' in b ? b.first_air_date : b.release_date,
      ).getTime();
      return sortB - sortA;
    });

  const getSortedData = (data?: Data[]) => {
    const dededuplicated = deduplicateData(data);
    return sortData(dededuplicated);
  };

  const data = getSortedData(
    type && filmographyData ? filmographyData[type] : similarData,
  );

  const getTitle = () => {
    if (path === 'movie') return '추천 영화';
    if (path === 'tv') return '추천 시리즈';
    return type === 'cast' ? '출연 작품' : '제작 작품';
  };

  if (!data?.length) return null;

  return (
    <div>
      <Slider title={getTitle()}>
        {data?.map((item) => (
          <StyledList key={item.id}>
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
          </StyledList>
        ))}
      </Slider>
    </div>
  );
}

const StyledList = styled.li`
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
