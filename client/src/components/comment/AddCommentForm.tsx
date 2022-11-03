import styled from 'styled-components';
import { useState } from 'react';
import { useMutation } from 'react-query';

import { createComment } from 'services/comment';

import { queryClient } from 'index';
import { useRecoilValue } from 'recoil';
import { userIdState } from 'atom/user';
import { useParams } from 'react-router-dom';

interface IProps {
  isNested?: boolean;
}

export default function AddCommentForm({ isNested = false }: IProps) {
  const [comment, setComment] = useState('');
  const userId = useRecoilValue(userIdState);

  const { id } = useParams();

  const { mutate } = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comment', id]);
      setComment('');
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value);
  };

  const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId || !comment) return;
    const body = {
      comment,
      postId: id,
      writer: userId,
    };
    mutate(body);
  };

  const checkEnterKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // if (e.key === 'Enter') {
    //   const body = {
    //     comment,
    //     postId,
    //     writer: userId,
    //   };
    //   mutate(body);
    // }
  };

  return (
    <Wrapper>
      <Form action="" onSubmit={handleSubmitComment} isNested={isNested}>
        <textarea
          disabled={!userId}
          placeholder={userId ? '댓글을 입력해 주세요' : '로그인이 필요합니다'}
          rows={1}
          value={comment}
          onChange={handleChangeComment}
          onKeyDown={checkEnterKey}
        />
        <button type="submit">등록</button>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  margin: 1.5em 0;
`;

const Form = styled.form<{ isNested: boolean }>`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  width: ${({ isNested }) => (isNested ? '95%' : '100%')};
  textarea {
    background-color: ${({ theme }) => theme.colors.gray50};
    border: none;
    border-radius: ${({ theme }) => theme.config.border};
    display: flex;
    flex: 1;
    margin: 0;
    overflow: hidden;
    padding: 0.7em 1em;
    resize: none;
  }

  button {
    align-items: center;
    background-color: ${({ theme }) => theme.colors.black};
    border: none;
    border-radius: ${({ theme }) => theme.config.border};
    color: #fff;
    font-size: 13px;
    height: 100%;
    justify-content: center;
    margin-left: 2em;
    width: 100px;
  }
`;
