import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from './cinene';

export default function useRedirection(isMemberOnly = false) {
  const { auth } = useAuth();
  const navigate = useNavigate();

  return useCallback(() => {
    if (isMemberOnly && !auth) navigate('/login');
    if (!isMemberOnly && auth) navigate('/');
  }, [navigate, auth, isMemberOnly]);
}
