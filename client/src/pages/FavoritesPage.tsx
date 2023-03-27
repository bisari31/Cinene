import styled from 'styled-components';

import { useAuth } from 'hooks/cinene';

import Favorites from 'components/favorites';
import LoginTriggerForm from 'components/LoginTriggerForm';

export default function FavoritesPage() {
  const { auth } = useAuth();

  return (
    <FavoritesPageWrapper>
      {auth ? <Favorites /> : <LoginTriggerForm />}
    </FavoritesPageWrapper>
  );
}

const FavoritesPageWrapper = styled.div``;
