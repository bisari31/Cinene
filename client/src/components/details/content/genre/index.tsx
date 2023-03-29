import dayjs from 'dayjs';
import styled, { css } from 'styled-components';

interface Props {
  data?: MovieDetails | TvDetails;
}

export default function Genre({ data }: Props) {
  const isMovieDetails = data && 'runtime' in data;

  const getReleaseDate = () => {
    if (isMovieDetails) return `개봉: ${data.release_date}`;
    const last = data?.last_air_date;
    const first = data?.first_air_date;
    const today = dayjs();
    const diff = today.diff(last, 'd');

    let result;
    if (first === last) result = first;
    else if (diff > 7) result = `${first} ~ ${last}`;
    else result = `${first} ~ `;

    return result;
  };

  return (
    <StyledDiv>
      <StyledRelease>{getReleaseDate()}</StyledRelease>
      <StyledRelease>
        {isMovieDetails ? `${data.runtime}분` : `시즌 ${data?.seasons.length}`}
      </StyledRelease>
      {data?.genres.map(({ id, name }) => (
        <StyledGenre key={id}>{name}</StyledGenre>
      ))}
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    gap: 0.8em 1em;
    margin-top: 1em;
    p {
      border-radius: 7px;
      color: ${theme.colors.white};
      display: inline-block;
      font-size: 0.78rem;
      font-weight: 400;
      padding: 0.6em 0.8em;
    }
  `}
`;
const StyledRelease = styled.p`
  background-color: ${({ theme }) => theme.colors.pink};
`;

const StyledGenre = styled.p`
  background-color: ${({ theme }) => theme.colors.navy50};
`;
