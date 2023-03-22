import { useLocation, useParams } from 'react-router-dom';

const REGEXP = /[a-z]{1,}/;

export default function useCurrentPathName() {
  const { pathname } = useLocation();
  const { id } = useParams();

  const path = pathname.match(REGEXP) || '';

  return { path: path[0] as MediaType, id: Number(id) };
}
