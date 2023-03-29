import dayjs from 'dayjs';
import styled, { css } from 'styled-components';

import { Upload } from 'assets';
import { USER_IMAGE } from 'utils/imageUrls';
import { useAuth, useLoginPortal } from 'hooks/cinene';

import Nickname from './Nickname';

interface Props {
  children: React.ReactNode;
}

export default function Profile({ children }: Props) {
  const { auth, setAuth } = useAuth();
  const { openPortal, renderPortal } = useLoginPortal();
  const createdAt = dayjs(auth?.createdAt).format(' YYYY년 MM월 DD일');

  const hancdleImageChange = () => openPortal('서비스 준비중 입니다 😅');

  return (
    <StyledDiv>
      <StyledSection>
        <StyledImgWrapper>
          <img src={auth?.img || USER_IMAGE} alt="profile" />
          <button type="button" onClick={hancdleImageChange}>
            <Upload />
          </button>
        </StyledImgWrapper>
        <StyledNicknameWrapper>
          <div>
            <Nickname auth={auth} setAuth={setAuth} />
          </div>
          <h3>{auth?.email}</h3>
          <div>
            <span>
              가입일:
              {createdAt}
            </span>
          </div>
        </StyledNicknameWrapper>
      </StyledSection>
      {children}
      {renderPortal()}
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  margin-top: 5em;
`;

const StyledSection = styled.section`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  position: relative;

  button {
    align-items: center;
    border: none;
    border-radius: 50%;
    display: flex;
    height: 35px;
    justify-content: center;
    width: 35px;
  }
  & > div:nth-child(2) {
    margin-top: 2em;
    text-align: center;
  }
`;

const StyledImgWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    img {
      border-radius: 50%;
      height: 160px;
      object-fit: cover;
      width: 160px;
    }
    & > button {
      background-color: ${theme.colors.pink};
      bottom: 20px;
      position: absolute;
      right: -5px;

      svg {
        stroke: #fff;
        stroke-width: 1.5;
      }
    }
  `}
`;

const StyledNicknameWrapper = styled.div`
  ${({ theme }) => css`
    h3 {
      color: ${theme.colors.white};
      font-size: 18px;
      margin-top: 2em;
    }
    & > div:nth-child(3) {
      margin-top: 0.8em;
      span {
        color: ${theme.colors.white};
        display: inline-block;
        font-size: 13px;
      }
    }
  `}
`;
