import { Link } from 'react-router-dom';
import styled from 'styled-components';

import useImageUrl from 'components/details/hooks/useImageUrl';

interface Props {
  item: Crew | Cast;
  isDirector?: boolean;
}

export default function CreditItem({ item, isDirector = false }: Props) {
  const { getPoster } = useImageUrl();
  const character = 'character' in item ? `${item.character} 역` : '정보 없음';
  return (
    <CreditItemWrapper>
      <Link to={`/person/${item.id}`} draggable="false">
        <div>
          <img
            draggable="false"
            src={getPoster(item.profile_path, '200', true)}
            alt={item.name}
          />
        </div>
        <div>
          <span>{item.name}</span>
          <span>{isDirector ? '감독' : character}</span>
        </div>
      </Link>
    </CreditItemWrapper>
  );
}

const CreditItemWrapper = styled.li`
  a {
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
        width: 90%;
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
        width: 90%;
      }
    }
  }
`;
