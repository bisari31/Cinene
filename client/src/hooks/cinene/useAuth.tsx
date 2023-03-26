import { authUserState } from 'atom/atom';
import { useRecoilState } from 'recoil';

export default function useAuth() {
  const [auth, setAuth] = useRecoilState(authUserState);

  return { auth, setAuth };
}
