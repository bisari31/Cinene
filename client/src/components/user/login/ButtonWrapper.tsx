import Button from 'components/common/Button';
import styled from 'styled-components';

import { KAKAO_URI } from 'utils/api';

import { PathName } from 'pages/LoginPage';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { userKeys } from 'utils/keys';
import { kakaoLogin } from 'services/user';
import { useSetRecoilState } from 'recoil';
import { userIdState } from 'atom/atom';

export default function ButtonWrapper({ type }: { type: PathName }) {
  const location = useLocation();
  const navigate = useNavigate();
  const setUserId = useSetRecoilState(userIdState);
  const isKakaoLogin = location.search.includes('code');
  const queryClient = useQueryClient();

  const { data } = useQuery(
    userKeys.default,
    () => kakaoLogin(location.search.slice(6)),
    {
      enabled: isKakaoLogin,
      onSuccess: (res) => {
        if (res.success && res.info) {
          return navigate(`/kakao-register`, {
            state: { nickname: res.info.nickname, email: res.info.email },
          });
        }
        setUserId(res.user._id);
        localStorage.setItem('userId', res.user._id);
        queryClient.invalidateQueries(['auth']);
        navigate('/');
      },
      onError: (err) => console.error(err),
    },
  );

  const handleClick = () => {
    window.location.href = KAKAO_URI;
  };

  return (
    <ButtonWrapperWrapper>
      <Button color="pink" size="fullWidth" type="submit">
        {type === 'login' ? '로그인' : '회원가입'}
      </Button>
      {type === 'login' && (
        <Button
          color="yellow"
          size="fullWidth"
          type="button"
          fontColor="black"
          onClick={handleClick}
        >
          카카오톡 로그인
        </Button>
      )}
    </ButtonWrapperWrapper>
  );
}

const ButtonWrapperWrapper = styled.div`
  & > button:nth-child(1) {
    margin-top: 3.5em;
  }
  & > button:nth-child(2) {
    margin-top: 1.5em;
  }
`;
