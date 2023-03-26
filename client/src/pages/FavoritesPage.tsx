import styled from 'styled-components';

import useAuthQuery from 'hooks/cinene/useAuth';

import Favorites from 'components/favorites';
import LoginTriggerForm from 'components/LoginTriggerForm';

export default function FavoritesPage() {
  const { auth } = useAuthQuery();

  return (
    <FavoritesPageWrapper>
      {auth ? <Favorites /> : <LoginTriggerForm />}
    </FavoritesPageWrapper>
  );
}

const FavoritesPageWrapper = styled.div``;
