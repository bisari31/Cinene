import styled from 'styled-components';

import useAuthQuery from 'components/header/hooks/useAuthQuery';

import Favorites from 'components/favorites';
import LoginTriggerForm from 'components/LoginTriggerForm';

export default function FavoritesPage() {
  const { auth, setAuth } = useAuthQuery();

  return (
    <FavoritesPageWrapper>
      {auth ? (
        <Favorites auth={auth} setAuth={setAuth} />
      ) : (
        <LoginTriggerForm />
      )}
    </FavoritesPageWrapper>
  );
}

const FavoritesPageWrapper = styled.div``;
