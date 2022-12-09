import { memo } from 'react';
import { useQuery } from 'react-query';
import styled, { css } from 'styled-components';
import { lighten, darken } from 'polished';

import { getMediaCredits, IMAGE_URL } from 'services/media';
import { ChevronRight } from 'assets';

interface Props {
  id: number;
  path: string;
}

function Actors({ id, path }: Props) {
  const { data } = useQuery([path, 'credits', id], () =>
    getMediaCredits(id, path),
  );

  return (
    <ActorsWrapper>
      <h3>배우</h3>
      <Ul>
        {data?.cast.map((actor, index) => {
          if (index > 4) return;
          return (
            <li key={actor.id}>
              <div>
                <img
                  src={
                    actor.profile_path
                      ? `${IMAGE_URL}/w500/${actor.profile_path}`
                      : 'https://blog.kakaocdn.net/dn/b8Kdun/btqCqM43uim/1sWJVkjEEy4LJMfR3mcqxK/img.jpg'
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
          );
        })}
      </Ul>
      <button type="button">
        더보기
        <ChevronRight />
      </button>
    </ActorsWrapper>
  );
}

export default memo(Actors);

const ActorsWrapper = styled.div`
  ${({ theme }) => css`
    h3 {
      font-size: 1rem;
      font-weight: 400;
      margin-bottom: 1em;
    }

    button {
      align-items: center;
      background: ${theme.colors.purple};
      border: none;
      border-radius: 12px;
      color: #fff;
      display: flex;
      font-size: 0.8rem;
      height: 35px;
      justify-content: center;
      margin-top: 3em;
      width: 85px;
      svg {
        height: 20px;
        margin-left: 0.2em;
        stroke: #fff;
        stroke-width: 1.5;
        width: 20px;
      }
      :hover {
        background: ${lighten(0.1, theme.colors.purple)};
      }
      :active {
        background: ${darken(0.1, theme.colors.purple)};
      }
    }
    @media ${theme.device.laptop} {
      button {
        margin-top: 3em;
      }
    }
  `}
`;

const Ul = styled.ul`
  align-items: center;
  display: flex;
  li {
    align-items: center;
    display: flex;
    flex-direction: column;
    div:nth-child(1) {
      height: 60px;
      width: 60px;
      img {
        border-radius: 50%;
        height: 60px;
        object-fit: cover;
        width: 60px;
      }
    }
    div:nth-child(2) {
      display: flex;
      flex-direction: column;
      margin-left: 0.6em;
      & > span:nth-child(1) {
        font-size: 1rem;
      }
      & > span:nth-child(2) {
        color: ${({ theme }) => theme.colors.gray500};
        font-size: 0.8rem;
        margin-top: 0.5em;
        text-overflow: ellipsis;
      }
    }
  }
  li + li {
    margin-left: 1.5em;
  }
  @media (min-width: 1300px) {
    flex-direction: column;
    margin-top: 1.5em;
    align-items: flex-start;
    li {
      flex-direction: row;
    }
    li + li {
      margin-left: 0;
      margin-top: 1.5em;
    }
  }
`;
