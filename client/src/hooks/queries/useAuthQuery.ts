import { authUserState } from 'atom/atom';
import { useRecoilState } from 'recoil';

export default function useAuthQuery() {
  const [auth, setAuth] = useRecoilState(authUserState);

  return { auth, setAuth };
}
