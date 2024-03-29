import { memo } from 'react';
import styled from 'styled-components';

import { Star } from 'assets';

interface Props {
  rating: number;
  previousRating: number;
  onClick: (rating: number) => void;
}

function RatingButtons({ onClick, previousRating, rating }: Props) {
  return (
    <StyledWrapper>
      {[1, 2, 3, 4, 5].map((value) => (
        <StyledButton
          isIncreased={previousRating < rating}
          isFilled={rating >= value}
          onClick={() => onClick(value)}
          key={value}
          type="button"
        >
          <Star />
        </StyledButton>
      ))}
    </StyledWrapper>
  );
}

export default memo(RatingButtons);

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const StyledButton = styled.button<{
  isFilled: boolean;
  isIncreased: boolean;
}>`
  background: none;
  border: none;
  svg {
    animation: ${({ isIncreased }) => isIncreased && 'pop 0.5s ease'};
    fill: ${({ theme, isFilled }) =>
      isFilled ? theme.colors.yellow : theme.colors.navy50};
    max-width: 35px;
    stroke: none;
    width: 100%;
  }
  @keyframes pop {
    0% {
      scale: 1;
    }
    50% {
      scale: 1.5;
    }
    100% {
      scale: 1;
    }
  }
`;
