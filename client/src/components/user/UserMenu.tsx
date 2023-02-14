import styled, { css } from 'styled-components';

interface ICategory {
  id: number;
  text: string;
  type: string;
  isActive: boolean;
}

interface IProps {
  category: ICategory[];
  onClick: (id: number) => void;
  target: ICategory;
}

export default function UserMenu({ category, onClick, target }: IProps) {
  return (
    <Ul>
      {category.map((list) => (
        <List key={list.id} isActive={list.isActive}>
          <button onClick={() => onClick(list.id)} type="button">
            {list.text}
          </button>
        </List>
      ))}
      <Slider target={target.id} length={category.length} />
    </Ul>
  );
}

const Ul = styled.ul`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
  display: flex;
  flex-direction: row;
  margin-top: 3em;
  position: relative;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

const List = styled.li<{ isActive: boolean }>`
  ${({ theme, isActive }) => css`
    font-size: 14px;
    text-align: center;
    width: 100%;
    button {
      background: none;
      border: none;
      color: ${isActive ? theme.colors.white : theme.colors.gray300};
      font-weight: ${isActive ? 400 : 300};
      padding: 1em;
      width: 100%;
    }
    @media ${theme.device.tablet} {
      width: 200px;
    }
  `}
`;

const Slider = styled.div<{ target: number; length: number }>`
  ${({ target, length, theme }) => css`
    background-color: ${theme.colors.white};
    border-radius: 5px;
    bottom: -2px;
    height: 3px;
    position: absolute;
    transform: ${`translateX(calc(${target} * 100%))`};
    transition: 0.35s ease;
    width: ${`calc(100% / ${length})`};
    @media ${theme.device.tablet} {
      width: ${`calc(600px / ${length})`};
    }
  `}
`;
