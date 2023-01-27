import { useAuthQuery } from 'hooks/useAuthQuery';
import styled, { css } from 'styled-components';
import { buttonEffect } from 'styles/css';

export default function FavoritesPage() {
  const { data } = useAuthQuery();
  return (
    <FavoritesPageWrapper>
      {!data?.success ? (
        <div>
          로그인이 필요한 서비스 입니다.
          <button type="button">로그인하기</button>
        </div>
      ) : (
        'ㅇㅇ'
      )}
    </FavoritesPageWrapper>
  );
}

const FavoritesPageWrapper = styled.div``;
