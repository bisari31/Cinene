import { useCallback } from 'react';

import { IMAGE_URL } from 'services/tmdb';
import { EMPTY_IMAGE, USER_IMAGE } from 'utils/imageUrls';

type Size = '200' | '300' | '400' | '500' | 'full';

export default function useImageUrl() {
  const getImageUrl = useCallback(
    (path: string | null | undefined, size: Size, isPerson = false) => {
      if (path) {
        const resize = size === 'full' ? `/original` : `/w${size}`;
        return IMAGE_URL + resize + path;
      }
      return !isPerson ? EMPTY_IMAGE : USER_IMAGE;
    },
    [],
  );

  return { getImageUrl };
}
