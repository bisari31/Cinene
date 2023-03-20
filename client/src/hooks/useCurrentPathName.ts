import { useLocation, useParams } from 'react-router-dom';

const REGEXP = /[a-z]{1,}/;

export default function useCurrentPathName() {
  const location = useLocation();
  const params = useParams();

  const path = location.pathname.match(REGEXP) || '';

  return { path: path[0] as MediaType, id: Number(params.id) };
}
