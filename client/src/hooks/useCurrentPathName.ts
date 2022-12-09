import { useLocation, useParams } from 'react-router-dom';

export default function useCurrentPathName() {
  const location = useLocation();
  const params = useParams();
  const regex = /[a-z]{1,}/;

  const path = location.pathname.match(regex);

  if (!path) return { path: '', id: 0 };
  return { path: path[0], id: Number(params.id) };
}
