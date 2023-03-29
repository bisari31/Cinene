import styled from 'styled-components';

import { useImageUrl } from 'hooks/cinene';

import Slider from 'components/common/Slider';

interface Props {
  data?: TvDetails;
}

export default function Seasons({ data }: Props) {
  const { getImageUrl } = useImageUrl();
  if (!data || !data.seasons?.length) return null;
  return (
    <StyledWrapper>
      <Slider title="시즌">
        {data.seasons?.map((season) => (
          <StyledList key={season.id}>
            <img
              draggable="false"
              src={getImageUrl(season.poster_path, '200')}
              alt={season.name}
            />
            <p>
              {season.name}
              <time dateTime={season.air_date}>{` (${season.air_date})`}</time>
            </p>
          </StyledList>
        ))}
      </Slider>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div``;
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
    time {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.colors.gray300};
    }
  }
  & + & {
    padding-left: 1.5em;
  }
`;
