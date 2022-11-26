import Carousel from 'components/common/Carousel';
import { useQuery } from 'react-query';
import { getTrendingMedia } from 'services/movie';
import styled from 'styled-components';

export default function Popular() {
  const { data } = useQuery(['movie', 'popular'], getTrendingMedia, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });

  return (
    <PopularWrapper>
      <h2>인기 작품</h2>
      <Carousel data={data} />
    </PopularWrapper>
  );
}

const PopularWrapper = styled.div`
  h2 {
    font-size: 1.8rem;
    font-weight: 500;
    margin-bottom: 1em;
  }
`;
