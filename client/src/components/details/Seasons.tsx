import styled from 'styled-components';

import { IMAGE_URL } from 'services/tmdb';
import { EMPTY_IMAGE } from 'utils/imageUrl';

import Slider from 'components/common/Slider';

interface IProps {
  seasons?: ITvDetails['seasons'] | false;
}

export default function Seasons({ seasons }: IProps) {
  if (!seasons) return null;

  return (
    <SeasonsWrapper>
      <Slider title="시즌">
        {seasons?.map((tv) => (
          <List key={tv.id}>
            <img
              draggable="false"
              src={
                tv.poster_path
                  ? `${IMAGE_URL}/w200/${tv.poster_path}`
                  : EMPTY_IMAGE
              }
              alt={tv.name}
            />
            <p>
              {tv.name}
              <time dateTime={tv.air_date}>{` (${tv.air_date})`}</time>
            </p>
          </List>
        ))}
      </Slider>
    </SeasonsWrapper>
  );
}

const SeasonsWrapper = styled.div``;
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
    time {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.colors.gray300};
    }
  }
  & + & {
    padding-left: 1.5em;
  }
`;
