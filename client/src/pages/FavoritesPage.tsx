import { useAuth } from 'hooks/cinene';

import Favorites from 'components/favorites';
import LoginTriggerForm from 'components/LoginTriggerForm';

export default function FavoritesPage() {
  const { auth } = useAuth();

  return <div>{auth ? <Favorites /> : <LoginTriggerForm />}</div>;
}
