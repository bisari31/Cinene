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
      <Slider target={target.id} />
    </Ul>
  );
}

const Ul = styled.ul`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  display: flex;
  flex-direction: row;
  margin-top: 3em;
  position: relative;
  width: 60%;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

const List = styled.li<{ isActive: boolean }>`
  ${({ theme, isActive }) => css`
    flex: 1;
    font-size: 14px;
    text-align: center;
    button {
      background: none;
      border: none;
      color: ${isActive ? theme.colors.black : theme.colors.gray500};
      font-weight: ${isActive ? 500 : 400};
      padding: 1em;
    }
  `}
`;

const Slider = styled.div<{ target: number }>`
  background-color: ${({ theme }) => theme.colors.black};
  border-radius: 5px;
  bottom: -1px;
  height: 3px;
  position: absolute;
  transform: ${({ target }) => `translateX(calc(${target} * 100%))`};
  transition: 0.35s ease;
  width: calc(100% / 3);
`;
