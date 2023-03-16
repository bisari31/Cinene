// import { useEffect } from 'react';
// import { useQuery } from 'react-query';
// import { useRecoilState, useRecoilValue } from 'recoil';

import { authUserState } from 'atom/atom';
import { useRecoilState } from 'recoil';

// import { autheticate } from 'services/user';
// import { authUserIdState } from 'atom/atom';
// import { authKeys } from 'utils/keys';
// import usePrevious from '../usePrevious';

// export default function useAuthQuery() {
//   const storageToken = localStorage.getItem('accessToken');
//   const storageUserId = localStorage.getItem('userId');
//   const [userId, setUserId] = useRecoilState(authUserIdState);
//   const prevUserId = usePrevious(storageUserId);

//   const data = useQuery(
//     authKeys.id(userId),
//     () => autheticate(storageToken ?? ''),
//     {
//       onSuccess: ({ accessToken }) => {
//         if (accessToken && accessToken !== storageToken) {
//           localStorage.setItem('accessToken', accessToken);
//         }
//       },
//       onError: ({ response }: AxiosError) => {
//         if (response.status === 401) {
//           localStorage.removeItem('accessToken');
//           localStorage.removeItem('setId');
//         }
//       },
//       enabled: false,
//     },
//   );

//   useEffect(() => {
//     const id = localStorage.getItem('userId');
//     if (id) setUserId(id);
//   }, [setUserId]);

//   return data;
// }

export default function useAuthQuery() {
  const [auth, setAuth] = useRecoilState(authUserState);

  return { auth, setAuth };
}
