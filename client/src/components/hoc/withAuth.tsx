import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthQuery } from 'hooks';

export default function withAuth(
  Component: React.ComponentType,
  option = false,
) {
  return function WithAuth() {
    const { data } = useAuthQuery();
    const navigate = useNavigate();

    useEffect(() => {
      if (data?.success) {
        if (!option) navigate('/');
      } else if (!data?.success && option) navigate('/login');
    }, [data, navigate]);

    return <Component />;
  };
}
