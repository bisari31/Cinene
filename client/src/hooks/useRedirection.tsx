import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuthQuery from 'components/header/hooks/useAuthQuery';

export default function useRedirection(isMemberOnly = false) {
  const { auth } = useAuthQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (isMemberOnly && !auth) navigate('/login');
    if (!isMemberOnly && auth) navigate('/');
  }, [auth, isMemberOnly, navigate]);
}
