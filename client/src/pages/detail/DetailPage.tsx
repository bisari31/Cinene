import { useQuery } from 'react-query';
import { useLocation, useParams } from 'react-router-dom';
import { getMediaDetail, IMAGE_URL } from 'services/media';
import styled from 'styled-components';

interface LocationState {
  state: {
    path: string;
    id: string;
  };
}

export default function DetailPage() {
  const { state }: LocationState = useLocation();

  const { data } = useQuery(
    ['media', state.id],
    () => getMediaDetail(+state.id, state.path),
    {
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (err) => {
        console.log(err);
      },
    },
  );

  return (
    <DetailPageWrapper>
      <Backdrop
        src={
          data?.backdrop_path
            ? `${IMAGE_URL}/original/${data?.backdrop_path}`
            : 'https://blog.kakaocdn.net/dn/b8Kdun/btqCqM43uim/1sWJVkjEEy4LJMfR3mcqxK/img.jpg'
        }
        alt="backdrop"
      />

      <Poster
        src={
          data?.poster_path
            ? `${IMAGE_URL}/original/${data?.poster_path}`
            : 'https://blog.kakaocdn.net/dn/b8Kdun/btqCqM43uim/1sWJVkjEEy4LJMfR3mcqxK/img.jpg'
        }
        alt="poster"
      />
    </DetailPageWrapper>
  );
}

const DetailPageWrapper = styled.div``;

const Backdrop = styled.img`
  height: 400px;
  object-fit: cover;
  width: 100%;
`;
const Poster = styled.img`
  height: 300px;
  object-fit: contain;
  width: 200px;
`;
