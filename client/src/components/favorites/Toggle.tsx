import styled from 'styled-components';
import React from 'react';

const TOGGLE_OPTION = [
  {
    id: 1,
    name: '미디어',
  },
  {
    id: 2,
    name: '배우',
  },
];

interface Props {
  selectedType: number;
  setSelectedType: React.Dispatch<React.SetStateAction<number>>;
}

export default function Toggle({ selectedType, setSelectedType }: Props) {
  return (
    <ToggleWrapper selectedType={selectedType}>
      <div>
        {TOGGLE_OPTION.map((toggle) => (
          <button
            key={toggle.id}
            type="button"
            onClick={() => setSelectedType(toggle.id)}
          >
            {toggle.name}
          </button>
        ))}
        <div className="toggle_bar" />
      </div>
    </ToggleWrapper>
  );
}

const ToggleWrapper = styled.div<{ selectedType: number }>`
  margin-top: 1em;
  div {
    border: 1px solid ${({ theme }) => theme.colors.navy50};
    border-radius: 30px;
    display: flex;
    height: 45px;
    position: relative;
    button {
      background: none;
      border: none;
      color: #fff;
      flex: 1;
      &:first-child {
        border-radius: 30px 0 0 30px;
      }
      &:last-child {
        border-radius: 0 30px 30px 0;
      }
    }
    .toggle_bar {
      background-color: ${({ theme }) => theme.colors.navy50};
      height: 100%;
      left: ${({ selectedType }) => (selectedType === 1 ? '0' : '50%')};
      position: absolute;
      transition: 0.5s ease;
      width: 50%;
      z-index: -1;
    }
  }
`;
