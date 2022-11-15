import { useState } from 'react';
import styled, { css } from 'styled-components';

import UserMenu from './UserMenu';
import Unregister from './Unregister';
import UserDetail from './UserDetail';
import PasswordForm from './PasswordForm';

export default function MenuWrapper() {
  const [category, setCategory] = useState([
    { id: 0, text: '활동 내역', type: 'detail', isActive: true },
    { id: 1, text: '비밀번호 변경', type: 'changePassword', isActive: false },
    { id: 2, text: '회원 탈퇴', type: 'unregister', isActive: false },
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
      case 'changePassword':
        return <PasswordForm />;
      case 'unregister':
        return <Unregister />;
      default:
    }
  };

  return (
    <Wrapper>
      <UserMenu
        target={target}
        category={category}
        onClick={handleChangeActive}
      />
      <article>{getComponent(target.type)}</article>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  ${({ theme }) => css`
    article {
      display: flex;
      padding: 5em;
      form {
        max-width: 400px;
        width: 100%;
      }
    }
    @media ${theme.device.mobile} {
      article {
        padding: 3em 1em;
      }
    }
  `}
`;
