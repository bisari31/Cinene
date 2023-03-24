import { useSetRecoilState } from 'recoil';
import { useMutation, useQueryClient } from 'react-query';

import { handleReview } from 'services/review';
import { cineneKeys } from 'utils/queryOptions';
import { authUserState } from 'atom/atom';

export default function useReviewMutation(
  reviewModal: () => void,
  errorModal: (msg?: string) => void,
  data?: CineneData,
) {
  const setAuth = useSetRecoilState(authUserState);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(handleReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(
        cineneKeys.detail(data?.content_type, data?.tmdbId),
      );
      reviewModal();
    },
    onError: ({ response }: AxiosError) => {
      if (response.status === 401) {
        setAuth(null);
        errorModal();
      } else {
        errorModal(`${response.data.message} 😭`);
      }
    },
  });

  return mutate;
}
