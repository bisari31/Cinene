import { IMAGE_URL } from 'services/tmdb';
import { EMPTY_IMAGE, USER_IMAGE } from 'utils/imageUrl';

type Size = '200' | '300' | '400' | '500' | 'full';

export default function useImageUrl() {
  const getPoster = (
    path: string | null | undefined,
    size: Size,
    isPerson = false,
  ) => {
    if (path) {
      const resize = size === 'full' ? `/original` : `/w${size}`;
      return IMAGE_URL + resize + path;
    }
    return !isPerson ? EMPTY_IMAGE : USER_IMAGE;
  };

  return { getPoster };
}
