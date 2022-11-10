import styled, { css } from 'styled-components';
import { useState } from 'react';

export default function Categories() {
  const [categories, setCategories] = useState([
    { id: 0, text: '활동 내역', isActive: true },
    { id: 1, text: '정보 수정', isActive: false },
    { id: 2, text: '회원 탈퇴', isActive: false },
  ]);
  const [target, setTarget] = useState(0);

  const handleChangeActive = (id: number) => {
    setCategories((prev) =>
      prev.map((list) =>
        list.id === id
          ? { ...list, isActive: !list.isActive }
          : { ...list, isActive: false },
      ),
    );
    setTarget(id);
  };
  return (
    <CategoriesWrapper>
      {categories.map((list) => (
        <List key={list.id} isActive={list.isActive}>
          <button onClick={() => handleChangeActive(list.id)} type="button">
            {list.text}
          </button>
        </List>
      ))}
      <Slider target={target} />
    </CategoriesWrapper>
  );
}

const CategoriesWrapper = styled.ul`
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
