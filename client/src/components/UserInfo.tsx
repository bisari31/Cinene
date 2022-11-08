import { useState } from 'react';
import dayjs from 'dayjs';
import { useAuthQuery } from 'hooks/useAuthQuery';
import styled from 'styled-components';

export default function UserInfo() {
  const [categories, setCategories] = useState([
    { id: 0, text: '활동 내역', isActive: true },
    { id: 1, text: '정보 수정', isActive: false },
    { id: 2, text: '회원 탈퇴', isActive: false },
  ]);
  const [target, setTarget] = useState(0);
  const data = useAuthQuery();

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
    <UserInfoWrapper>
      <UserWrapper>
        <div>
          <img src={data.data?.user.img} alt="" />
        </div>
        <div>
          <h2>{data.data?.user.nickname}</h2>
          <h3>{data.data?.user.email}</h3>
          <div>
            <span>
              가입일:
              {dayjs(data.data?.user.createdAt).format(' YYYY년 MM월 DD일')}
            </span>
          </div>
        </div>
      </UserWrapper>
      <Menu target={target}>
        {categories.map((list) => (
          <List key={list.id} isActive={list.isActive}>
            <button onClick={() => handleChangeActive(list.id)} type="button">
              {list.text}
            </button>
          </List>
        ))}
        <div />
      </Menu>
      {/* <div>카테고리 정보</div> */}
    </UserInfoWrapper>
  );
}

const UserInfoWrapper = styled.div`
  margin-top: 5em;
`;

const UserWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  position: relative;
  & > div:nth-child(1) {
    margin-right: 2em;
    img {
      border-radius: 50%;
      height: 160px;
      object-fit: cover;
      width: 160px;
    }
  }
  & > div:nth-child(2) {
    h2 {
      font-size: 30px;
      font-weight: 500;
    }
    h3 {
      color: ${({ theme }) => theme.colors.gray500};
      font-size: 18px;
      margin-top: 1em;
    }
    div {
      margin-top: 0.8em;
      span {
        color: ${({ theme }) => theme.colors.gray500};
        font-size: 13px;
      }
    }
  }
`;

const Menu = styled.ul<{ target: number }>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  display: flex;
  margin-top: 3em;
  position: relative;
  div:last-child {
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
