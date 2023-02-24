import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import { throttle } from 'utils';
import Unregister from './Unregister';
import ChangePassword from './ChangePassword';

interface Item {
  id: number;
  text: string;
  type: 'passwordChange' | 'unregister';
  isActive: boolean;
}

const WIDTH = 200;

export default function Tab() {
  const [list, setList] = useState<Item[]>([
    { id: 1, text: '비밀번호 변경', type: 'passwordChange', isActive: true },
    { id: 2, text: '회원 탈퇴', type: 'unregister', isActive: false },
  ]);
  const [width, setWidth] = useState(WIDTH);
  const [target, setTarget] = useState<Item>(list[0]);
  const ulRef = useRef<HTMLUListElement>(null);

  const handleClick = (id: number) => {
    setList((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, isActive: !item.isActive }
          : { ...item, isActive: false },
      ),
    );
    setTarget(list[id - 1]);
  };

  useEffect(() => {
    const getWidth = () => {
      const { clientWidth } = ulRef.current?.firstElementChild as HTMLElement;
      setWidth(clientWidth ?? WIDTH);
    };

    const throttleWidth = throttle(getWidth, 1000);
    window.addEventListener('resize', throttleWidth);
    return () => window.removeEventListener('resize', throttleWidth);
  }, []);

  return (
    <Wrapper>
      <ul ref={ulRef}>
        {list.map((item) => (
          <List key={item.id} isActive={item.isActive}>
            <button type="button" onClick={() => handleClick(item.id)}>
              {item.text}
            </button>
          </List>
        ))}
        <SlideBar index={target.id - 1} width={width} />
      </ul>
      {target.type === 'passwordChange' ? <ChangePassword /> : <Unregister />}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  ${({ theme }) => css`
    margin-top: 3em;
    ul {
      align-items: center;
      border-bottom: 1px solid ${theme.colors.gray500};
      display: flex;
      position: relative;
    }
    & > div:last-child {
      display: flex;
      padding: 3em 1em;
      form {
        max-width: 400px;
        width: 100%;
      }
    }
    @media ${theme.device.tablet} {
      & > div:last-child {
        padding: 5em;
      }
    }
  `}
`;

const List = styled.li<{ isActive: boolean }>`
  ${({ theme, isActive }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 200px;
    height: 50px;
    width: 100%;
    button {
      width: 100%;
      height: 100%;
      color ${isActive ? theme.colors.white : theme.colors.gray500};
      border: none;
      background: none;
      }
  `}
`;

const SlideBar = styled.div<{ index: number; width: number }>`
  ${({ index, width }) => css`
    background-color: #fff;
    border-radius: 2px;
    bottom: -2px;
    height: 3px;
    left: ${`calc(${width}px * ${index})`};
    position: absolute;
    transition: 0.5s ease;
    width: ${`${width}px`};
  `}
`;
