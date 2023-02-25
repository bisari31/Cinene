import dayjs from 'dayjs';
import styled, { css } from 'styled-components';

import { Upload } from 'assets';
import { USER_IMAGE } from 'utils/imageUrl';

import Nickname from './Nickname';

interface IProps {
  children: React.ReactNode;
  user: IUser | undefined;
}

export default function Profile({ children, user }: IProps) {
  return (
    <UserProfileWrapper>
      <Section>
        <ImgWrapper>
          <img src={USER_IMAGE} alt="profile" />
          <button type="button">
            <Upload />
          </button>
        </ImgWrapper>
        <NicknameWrapper>
          <div>
            <Nickname />
          </div>
          <h3>{user?.email}</h3>
          <div>
            <span>
              가입일:
              {dayjs(user?.createdAt).format(' YYYY년 MM월 DD일')}
            </span>
          </div>
        </NicknameWrapper>
      </Section>
      {children}
    </UserProfileWrapper>
  );
}

const UserProfileWrapper = styled.div`
  margin-top: 5em;
`;

const Section = styled.section`
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

const ImgWrapper = styled.div`
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

const NicknameWrapper = styled.div`
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
