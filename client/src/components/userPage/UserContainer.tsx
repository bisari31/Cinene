import { useState } from 'react';
import styled from 'styled-components';

import UserMenu from './UserMenu';
import ConfirmPassword from './ConfirmPassword';
import UserDetail from './UserDetail';
import UserModify from './UserModify';

export default function UserContainer() {
  const [category, setCategory] = useState([
    { id: 0, text: '활동 내역', type: 'detail', isActive: true },
    { id: 1, text: '정보 수정', type: 'modify', isActive: false },
    { id: 2, text: '회원 탈퇴', type: 'delete', isActive: false },
  ]);
  const [target, setTarget] = useState(category[0]);

  const handleChangeActive = (id: number) => {
    setCategory((prev) =>
      prev.map((list) =>
        list.id === id
          ? { ...list, isActive: !list.isActive }
          : { ...list, isActive: false },
      ),
    );
    setTarget(category[id]);
  };

  const getComponent = (type: string) => {
    switch (type) {
      case 'detail':
        return <UserDetail />;
      case 'modify':
        return <UserModify />;
      case 'delete':
        return <ConfirmPassword />;
      default:
    }
  };

  return (
    <UserContainerWrapper>
      <UserMenu
        target={target}
        category={category}
        onClick={handleChangeActive}
      />
      <article>{getComponent(target.type)}</article>
    </UserContainerWrapper>
  );
}

const UserContainerWrapper = styled.section`
  article {
    padding: 5em;
  }
`;
