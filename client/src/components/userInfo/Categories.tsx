import styled from 'styled-components';
import { useState } from 'react';

export default function Categories() {
  const [categories, setCategories] = useState([
    { id: 0, text: '활동 내역', isActive: true, category: 'detail' },
    { id: 1, text: '정보 수정', isActive: false, category: 'edit' },
    { id: 2, text: '회원 탈퇴', isActive: false, category: 'remove' },
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
    <CategoriesWrapper target={target}>
      {categories.map((list) => (
        <List key={list.id} isActive={list.isActive}>
          <button onClick={() => handleChangeActive(list.id)} type="button">
            {list.text}
          </button>
        </List>
      ))}
      <div />
    </CategoriesWrapper>
  );
}

const CategoriesWrapper = styled.ul<{ target: number }>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  display: flex;
  margin-top: 3em;
  position: relative;
  & > div:last-child {
    background-color: ${({ theme }) => theme.colors.black};
    border-radius: 5px;
    bottom: -1px;
    height: 3px;
    position: absolute;
    transform: ${({ target }) => `translateX(calc(${target} * 100%))`};
    transition: 0.35s ease;
    width: 150px;
  }
`;

const List = styled.li<{ isActive: boolean }>`
  font-size: 14px;
  text-align: center;
  width: 150px;

  button {
    background: none;
    border: none;
    color: ${({ theme, isActive }) =>
      isActive ? theme.colors.black : theme.colors.gray500};
    font-weight: ${({ isActive }) => (isActive ? 500 : 400)};
    padding: 1em;
    width: 100%;
  }
`;
