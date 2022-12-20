import { useState, memo, useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { getMediaCredits, IMAGE_URL } from 'services/media';
import { USER_IMAGE } from 'utils/imageUrl';

import Slider from 'components/common/Slider';

interface Props {
  id: number;
  path: string;
}

function Credits({ id, path }: Props) {
  const [directror, setDirector] = useState<Crew[]>();
  const { data } = useQuery([path, 'credits', id], () =>
    getMediaCredits(id, path),
  );

  useEffect(() => {
    setDirector(data?.crew.filter((person) => person.job === 'Director'));
  }, [data]);

  if (!data) return <div>loading...</div>;

  return (
    <CreditsWrapper>
      <Slider title="감독 / 출연진">
        {directror?.map((crew) => (
          <li key={crew.id}>
            <div>
              <img
                src={
                  crew.profile_path
                    ? `${IMAGE_URL}/w200/${crew.profile_path}`
                    : USER_IMAGE
                }
                alt={crew.name}
              />
            </div>
            <div>
              <span>{crew.name}</span>
              <span>감독</span>
            </div>
          </li>
        ))}
        {data.cast.map((actor) => (
          <li key={actor.id + Math.random()}>
            <div>
              <img
                src={
                  actor.profile_path
                    ? `${IMAGE_URL}/w200/${actor.profile_path}`
                    : USER_IMAGE
                }
                alt={actor.name}
              />
            </div>
            <div>
              <span>{actor.name}</span>
              <span>
                {actor.character ? `${actor.character} 역` : '정보 없음'}
              </span>
            </div>
          </li>
        ))}
      </Slider>
    </CreditsWrapper>
  );
}

export default memo(Credits);

const CreditsWrapper = styled.div`
  overflow: hidden;
  li {
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 80px;
    div:nth-child(1) {
      height: 60px;
      margin-bottom: 0.5em;
      width: 60px;
      img {
        border-radius: 50%;
        height: 100%;
        object-fit: cover;
        width: 100%;
      }
    }
    div:nth-child(2) {
      display: flex;
      flex-direction: column;
      height: 60px;
      margin-left: 0.6em;
      width: 80px;
      & > span:nth-child(1) {
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        font-size: 0.9rem;
        overflow: hidden;
        white-space: normal;
      }
      & > span:nth-child(2) {
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        color: ${({ theme }) => theme.colors.gray500};
        display: -webkit-box;
        font-size: 0.8rem;
        margin-top: 0.5em;
        overflow: hidden;
        white-space: normal;
      }
    }
  }
`;
