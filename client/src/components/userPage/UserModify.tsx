import axios from 'axios';
import Button from 'components/common/Button';
import Input from 'components/common/Input';
import { useAuthQuery } from 'hooks/useAuthQuery';
import useInput from 'hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { updateUser } from 'services/auth';
import styled from 'styled-components';

export default function UserModify() {
  const { data } = useAuthQuery();
  const [nickname, handleChangeNickname] = useInput();
  const [prevPassword, handlePrevPassword] = useInput();
  const [password, handlePassword] = useInput();
  const [confirmPassword, handleConfirmPassword] = useInput();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = { nickname, password: prevPassword, id: data?.user._id };
    updateUser(body)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) console.error(err.response?.data);
      });
  };

  return (
    <UserModifyWrapper>
      <form action="" onSubmit={handleSubmit}>
        <Input label="이메일" type="text" value={data?.user.email} disabled />
        <Input
          label="닉네임"
          type="text"
          value={nickname}
          onChange={handleChangeNickname}
        />
        <Input
          label="이전 비밀번호"
          type="password"
          value={prevPassword}
          onChange={handlePrevPassword}
        />
        <Input
          label="변경 비밀번호"
          type="password"
          placeholder="(변경 시 입력)"
          value={password}
          onChange={handlePassword}
        />
        <Input
          label="변경 비밀번호 확인"
          type="password"
          placeholder="(변경 시 입력)"
          value={confirmPassword}
          onChange={handleConfirmPassword}
        />
        <Button
          disable={!nickname.length || !prevPassword.length}
          color="black"
          size="fullWidth"
          type="submit"
        >
          정보 변경
        </Button>
      </form>
    </UserModifyWrapper>
  );
}

const UserModifyWrapper = styled.div`
  display: flex;
  justify-content: center;
  form {
    width: 350px;
    Button {
      margin-top: 5em;
    }
  }
`;
