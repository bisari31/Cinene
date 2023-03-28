import Tab from 'components/user/profile/Tab';
import Profile from 'components/user/profile';
import { useRedirection } from 'hooks';

export default function MyPage() {
  useRedirection(true);

  return (
    <Profile>
      <Tab />
    </Profile>
  );
}
