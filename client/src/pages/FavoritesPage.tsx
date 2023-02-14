import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAuthQuery } from 'hooks/useAuthQuery';

import Button from 'components/common/Button';
import Favorites from 'components/favorites';

export default function FavoritesPage() {
  const { data } = useAuthQuery();
  const navigate = useNavigate();

  return (
    <FavoritesPageWrapper>
      {!data?.success ? (
        <GuestForm>
          로그인이 필요한 서비스 입니다.
          <Button
            onClick={() => navigate('/login')}
            type="button"
            size="small"
            color="pink"
          >
            로그인
          </Button>
        </GuestForm>
      ) : (
        <Favorites data={data} />
      )}
    </FavoritesPageWrapper>
  );
}

const FavoritesPageWrapper = styled.div``;

const GuestForm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 1.1rem;
  font-weight: 400;
  height: ${({ theme }) => `calc(100vh - ${theme.config.header})`};
  justify-content: center;
  button {
    border-radius: 12px;
    height: 40px;
    margin-top: 3em;
    width: 150px;
  }
`;
