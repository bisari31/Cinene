import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthQuery } from 'hooks';

export default function withAuth(
  Component: React.ComponentType,
  option = false,
) {
  return function WithAuth() {
    const { auth } = useAuthQuery();
    const navigate = useNavigate();

    useEffect(() => {
      if (auth) {
        if (!option) navigate('/');
      } else if (!auth && option) navigate('/login');
    }, [auth, navigate]);

    return <Component />;
  };
}
