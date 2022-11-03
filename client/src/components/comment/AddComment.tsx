import styled from 'styled-components';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { createComment } from 'services/comment';
import { queryClient } from 'index';

interface IProps {
  postId: string;
  userId: string;
}

export default function AddComment({ postId, userId }: IProps) {
  const [comment, setComment] = useState<string>('');
  const { mutate } = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comment', postId]);
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
    const body = {
      comment,
      postId,
      writer: userId,
    };
    mutate(body);
  };

  const checkEnterKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      console.log('enter');
    }
  };

  return (
    <CommentWrapper>
      <Form action="" onSubmit={handleSubmitComment}>
        <textarea
          placeholder="댓글을 입력해 주세요"
          rows={1}
          value={comment}
          onChange={handleChangeComment}
          onKeyDown={checkEnterKey}
        />
        <button type="submit">등록</button>
      </Form>
    </CommentWrapper>
  );
}

const CommentWrapper = styled.div`
  display: flex;
  margin-top: 1.5em;
`;

const Form = styled.form`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin: 0;
  width: 100%;
  textarea {
    border: 1px solid ${({ theme }) => theme.colors.gray100};
    border-radius: ${({ theme }) => theme.config.border2};
    display: flex;
    flex: 1;
    margin: 0;
    overflow: hidden;
    padding: 0.7em;
    resize: none;
  }
  button {
    background-color: ${({ theme }) => theme.colors.black};
    border: none;
    border-radius: ${({ theme }) => theme.config.border2};
    color: #fff;
    height: 36px;
    margin-left: 3em;
    width: 150px;
  }
`;
