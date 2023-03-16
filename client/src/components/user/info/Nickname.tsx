import styled from 'styled-components';
import { useEffect, useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import { useAuthQuery, useInput, useOutsideClick } from 'hooks';

import { changeNickname } from 'services/user';
import { CheckMark, Edit } from 'assets/index';

import Input from 'components/common/Input';
import Portal from 'components/common/Portal';
import Modal from 'components/common/Modal';

export default function Nickname() {
  const [isChanged, setIsChanged] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const {
    value: nickname,
    handleChange: handleNicknameChange,
    setValue: setNickname,
    ref: inputRef,
    error,
    setError,
  } = useInput('nickname');

  const { ref, isVisible, toggleModal, isMotionVisible } = useOutsideClick();
  const { auth, setAuth } = useAuthQuery();
  const { mutate } = useMutation(changeNickname, {
    onSuccess: (res) => {
      // if (!res.success) return setError(res.message ?? '');
      inputRef.current?.blur();
      // setAuth(res)
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (error) return;
    if (auth?.nickname === nickname) {
      setError('닉네임이 같습니다.');
      return;
    }
    mutate(nickname);
    setIsChanged(true);
    toggleModal();
  };

  const handleFocus = useCallback(() => {
    setIsChanging(true);
    setNickname('');
    if (isChanged) setIsChanged(false);
  }, [isChanged, setNickname]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') inputRef.current?.blur();
    },
    [inputRef],
  );

  const handleBlur = useCallback(
    (prevNickname?: string) => {
      if (!isChanged) setNickname(prevNickname ?? '');
      setError('');
      setIsChanging(false);
    },
    [setError, setNickname, isChanged],
  );

  useEffect(() => {
    if (auth) setNickname(auth.nickname);
  }, [auth, setNickname]);

  return (
    <Form onSubmit={handleSubmit} isEmpty={!nickname.length} isError={!!error}>
      <Input
        placeholder="특수문자 제외 2~10자"
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={() => handleBlur(auth?.nickname)}
        errorMessage={error}
        ref={inputRef}
        type="text"
        value={nickname}
        onChange={handleNicknameChange}
      />
      {isChanging ? <CheckMark className="svg-check-mark" /> : <Edit />}

      {isVisible && (
        <Portal>
          <Modal
            ref={ref}
            isVisible={isMotionVisible}
            buttonText={['확인']}
            color="pink"
            executeFn={toggleModal}
          >
            닉네임 변경 완료
          </Modal>
        </Portal>
      )}
    </Form>
  );
}

const Form = styled.form<{ isError: boolean; isEmpty: boolean }>`
  display: flex;
  height: 50px;
  justify-content: center;
  max-width: 350px;
  position: relative;
  div {
    align-items: center;
    flex-direction: column;
    input {
      &::placeholder {
        font-size: 1rem;
      }
      cursor: pointer;
      font-size: 23px;
      font-weight: 500;
      height: 100%;
      margin: 0;
      padding: 0 1.5em;
      text-align: center;
      width: 100%;
    }
  }
  .svg-check-mark {
    fill: ${({ theme, isError, isEmpty }) => {
      if (isEmpty || isError) return theme.colors.gray300;
      return theme.colors.blue;
    }};
    stroke: none;
  }
  svg {
    align-items: center;
    background: none;
    border: none;
    display: flex;
    height: 25px;
    pointer-events: none;
    position: absolute;
    right: 1rem;
    stroke: ${({ theme }) => theme.colors.gray300};
    stroke-width: 1.5;
    top: 50%;
    transform: translateY(-50%);
    width: 25px;
  }
`;
