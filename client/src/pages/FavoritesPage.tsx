import { useAuth } from 'hooks/cinene';

import Favorites from 'components/favorites';
import LoginPrompt from 'components/LoginPrompt';

export default function FavoritesPage() {
  const { auth } = useAuth();

  return auth ? <Favorites /> : <LoginPrompt />;
}
