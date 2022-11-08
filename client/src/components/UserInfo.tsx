import dayjs from 'dayjs';
import { useAuthQuery } from 'hooks/useAuthQuery';
import styled from 'styled-components';

export default function UserInfo() {
  const data = useAuthQuery();

  return (
    <UserInfoWrapper>
      <UserWrapper>
        <div>
          <img src={data.data?.user.img} alt="" />
        </div>
        <div>
          <h2>{data.data?.user.nickname}</h2>
          <h3>{data.data?.user.email}</h3>
          <div>
            <span>
              가입일:{' '}
              {dayjs(data.data?.user.createdAt).format('YYYY년 MM월 DD일')}
            </span>
          </div>
        </div>
      </UserWrapper>
      <div>카테고리</div>
      <div>카테고리 정보</div>
    </UserInfoWrapper>
  );
}

const UserInfoWrapper = styled.div`
  margin-top: 5em;
`;

const UserWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  position: relative;
  & > div:nth-child(1) {
    margin-right: 2em;
    img {
      border-radius: 50%;
      height: 160px;
      object-fit: cover;
      width: 160px;
    }
  }
  & > div:nth-child(2) {
    h2 {
      font-size: 30px;
      font-weight: 500;
    }
    h3 {
      color: ${({ theme }) => theme.colors.gray500};
      font-size: 18px;
      margin-top: 1em;
    }
    div {
      margin-top: 0.8em;
      span {
        font-size: 14px;
      }
    }
  }
`;
