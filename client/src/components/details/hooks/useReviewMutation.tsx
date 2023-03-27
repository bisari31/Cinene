import { useMutation } from 'react-query';

import { handleReview } from 'services/review';
import { cineneKeys } from 'utils/queryOptions';
import useMutationOptions from 'hooks/cinene/useMutationOptions';

export default function useReviewMutation(
  reviewModal: () => void,
  errorModal: (msg?: string) => void,
  data?: CineneData,
) {
  const { errorHandler, queryClient } = useMutationOptions(errorModal);

  const { mutate } = useMutation(handleReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(
        cineneKeys.detail(data?.content_type, data?.tmdbId),
      );
      reviewModal();
    },
    onError: (err: AxiosError) => errorHandler(err),
  });

  return mutate;
}
