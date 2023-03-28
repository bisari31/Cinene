import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const REGEXP = /[a-z]{1,}/;

export default function useCurrentPathName() {
  const { pathname } = useLocation();
  const { id } = useParams();

  const path = useMemo(() => pathname.match(REGEXP) || '', [pathname]);

  return { path: path[0] as MediaType, id: Number(id) };
}
