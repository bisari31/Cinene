import { useEffect } from 'react';

import { useAuthQuery } from 'hooks/useAuthQuery';
import { useNavigate } from 'react-router-dom';

export default function AuthHoc(
  Component: React.ComponentType,
  option = false,
) {

  function Authentication() {
    const { data } = useAuthQuery();
    const navigate = useNavigate();

    useEffect(() => {
      if (data?.success) {
        if (!option) navigate('/');
      } else if (!data?.success && option) navigate('/login');
    }, [data, navigate]);

    return <Component />;
  }

  return Authentication;
}
