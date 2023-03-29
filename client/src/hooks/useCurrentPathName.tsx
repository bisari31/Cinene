import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const REGEXP = /[a-z]{1,}/;

export default function useCurrentPathName<T>() {
  const { pathname, search } = useLocation();
  const { id } = useParams();

  const path = useMemo(() => pathname.match(REGEXP) || '', [pathname]);

  return { path: path[0] as T, id: Number(id), search };
}
