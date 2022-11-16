import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import PostList from 'components/posts/PostList';
import { useAuthQuery } from 'hooks/useAuthQuery';
import Button from 'components/common/Button';
import axios from 'axios';

export default function LandingPage() {
  const { data } = useAuthQuery();
  const navigate = useNavigate();

  const onClickPostUpload = () => {
    navigate('/post/write');
  };

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://api.themoviedb.org/3/movie/76341?api_key=954b27683db193b3c5982c66787b3d39&language=ko`,
  //     )
  //     .then((res) => console.log(res));
  // });

  return (
    <LandingPageWrapper>
      <PostList />
      <div>
        <Button
          color="black"
          isDisabled={!data?.isLoggedIn}
          size="small"
          type="button"
          onClick={onClickPostUpload}
        >
          글쓰기
        </Button>
      </div>
    </LandingPageWrapper>
  );
}

const LandingPageWrapper = styled.div`
  & > div:last-child {
    display: flex;
    justify-content: flex-end;
    margin-top: 2em;
  }
`;
