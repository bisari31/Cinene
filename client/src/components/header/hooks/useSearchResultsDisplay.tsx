import { useMemo } from 'react';

import { IMAGE_URL } from 'services/tmdb';
import { EMPTY_IMAGE, USER_IMAGE } from 'utils/imageUrl';

export default function useSearchResultsDisplay(item: SearchResults) {
  const title = useMemo(() => {
    const { media_type: type } = item;
    if (type === 'tv' && 'name' in item) return `${item.name} (TV)`;
    if (type === 'movie' && 'title' in item) return `${item.title} (영화)`;
    if (type === 'person' && 'name' in item) return `${item.name} (인물)`;
    return '정보 없음';
  }, [item]);

  const image = useMemo(() => {
    const url = `${IMAGE_URL}/w200`;
    if (item.media_type === 'person' && 'profile_path' in item) {
      return item.profile_path ? url + item.profile_path : USER_IMAGE;
    }
    return 'poster_path' in item && item.poster_path
      ? url + item.poster_path
      : EMPTY_IMAGE;
  }, [item]);

  return { title, image };
}
