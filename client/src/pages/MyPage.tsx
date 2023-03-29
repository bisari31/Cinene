import { useEffect } from 'react';

import { useRedirection } from 'hooks';

import Tab from 'components/user/profile/Tab';
import Profile from 'components/user/profile';

export default function MyPage() {
  const redirection = useRedirection(true);

  useEffect(() => {
    redirection();
  }, [redirection]);

  return (
    <Profile>
      <Tab />
    </Profile>
  );
}
