import { Upload } from 'assets';
import Input from 'components/common/Input';
import dayjs from 'dayjs';
import { useAuthQuery } from 'hooks/useAuthQuery';
import useInput from 'hooks/useInput';
import styled, { css } from 'styled-components';

export default function UserProfile({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useAuthQuery();
  const [nickname, changeNickname] = useInput(data?.user.nickname);

  return (
    <UserProfileWrapper>
      <Section>
        <Img>
          <img src={data?.user.img} alt="" />
          <button type="button">
            <Upload />
          </button>
        </Img>
        <div>
          <Input type="text" disabled value={nickname} label="" />
          <h3>{data?.user.email}</h3>
          <div>
            <span>
              가입일:
              {dayjs(data?.user.createdAt).format(' YYYY년 MM월 DD일')}
            </span>
          </div>
        </div>
      </Section>
      {children}
    </UserProfileWrapper>
  );
}

const UserProfileWrapper = styled.div`
  margin-top: 5em;
`;

const Section = styled.section`
  ${({ theme }) => css`
    align-items: center;
    display: flex;
    flex-direction: row;
    position: relative;
    & > div:nth-child(2) {
      h2 {
        font-size: 30px;
        font-weight: 500;
      }
      h3 {
        color: ${theme.colors.gray500};
        font-size: 18px;
        margin-top: 1em;
      }
      div {
        margin-top: 0.8em;
        span {
          color: ${theme.colors.gray500};
          font-size: 13px;
        }
      }
    }
    @media ${theme.device.mobile} {
      flex-direction: column;
      & > div:nth-child(2) {
        margin-top: 2em;
        text-align: center;
      }
    }
  `}
`;

const Img = styled.div`
  ${({ theme }) => css`
    margin-right: 2em;
    position: relative;
    img {
      border-radius: 50%;
      height: 160px;
      object-fit: cover;
      width: 160px;
    }
    button {
      align-items: center;
      background-color: ${theme.colors.black};
      border: 2px solid #fff;
      border-radius: 50%;
      bottom: 20px;
      display: flex;
      height: 35px;
      justify-content: center;
      position: absolute;
      right: -5px;
      width: 35px;
      svg {
        stroke: #fff;
        stroke-width: 1.5;
        width: 20px;
      }
    }
    @media ${theme.device.mobile} {
      margin-right: 0;
    }
  `}
`;
