import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { getSimilarMedia, IMAGE_URL } from 'services/media';
import { getMediaOverview, getMediaTitle } from 'utils/media';

interface Props {
  data: IMediaResultsInDetail | undefined;
  path: string;
  id: number;
}

export default function Description({ path, id, data }: Props) {
  const { data: similarData } = useQuery([path, 'similar', data?.id], () =>
    getSimilarMedia(id, path),
  );

  const title = getMediaTitle(path, data);
  const overview = getMediaOverview(path, data);
  const getType = path === 'movie' ? '영화' : '시리즈';

  return (
    <DescriptionWrapper>
      <h2>{title}</h2>
      <p>{overview}</p>
      <div>
        <h3>추천 {getType}</h3>
        <SimilarMedia>
          {similarData?.map((media) => (
            <li key={media.id}>
              <Link to={`/${path}/${media.id}`}>
                <img
                  src={`${IMAGE_URL}/w500/${media.poster_path}`}
                  alt={media.name || media.title}
                />
                <span>{media.name || media.title}</span>
              </Link>
            </li>
          ))}
        </SimilarMedia>
      </div>
    </DescriptionWrapper>
  );
}

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 850px;
  padding: 0 4em;
  width: 100%;
  h2 {
    font-size: 2.3rem;
    font-weight: 500;
  }

  p {
    color: ${({ theme }) => theme.colors.gray300};
    font-size: 0.9rem;
    line-height: 1.6;
    margin-top: 3em;
  }

  h3 {
    font-size: 1.2rem;
    margin-top: 3em;
  }
`;
const SimilarMedia = styled.ul`
  align-items: flex-start;
  display: flex;
  height: 300px;
  margin-top: 2em;
  max-width: 790px;
  overflow-x: auto;
  overflow-y: hidden;
  li {
    display: flex;
    flex-direction: column;
    width: 140px;
    img {
      border-radius: 30px;
      height: 200px;
      width: 140px;
    }
    span {
      font-size: 0.8rem;
      width: 100%;
      display: inline-block;
      margin-top: 1em;
      text-align: center;
    }
  }
  li + li {
    margin-left: 1.5em;
  }
`;
