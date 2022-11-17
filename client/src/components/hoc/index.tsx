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
      if (data?.isLoggedIn) {
        if (!option) navigate(-1);
      } else if (!data?.isLoggedIn && option) navigate('/login');
    }, [data, navigate]);

    return <Component />;
  }

  return Authentication;
}
