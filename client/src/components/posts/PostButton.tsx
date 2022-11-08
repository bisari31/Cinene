import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { deletePost } from 'services/posts';
import Button from 'components/common/Button';
import { IPostFormProps } from './PostForm';

interface IProps extends IPostFormProps {
  user?: IUser;
  submit: (e: React.MouseEvent) => Promise<void>;
}

export default function PostButton({ type, user, content, submit }: IProps) {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate(-1);
  };

  const handleRemove = async () => {
    if (user?._id && content?._id) {
      const response = await deletePost(content._id, user._id);
      navigate('/');
      console.log(response);
    }
  };

  const moveModifyPage = () => {
    navigate(`post/${content?._id}/modify`);
  };

  return (
    <PostButtonWrapper>
      {type === 'view' && user?._id === content?.writer._id && (
        <>
          <Button
            type="button"
            color="gray100"
            size="medium"
            onClick={handleRemove}
          >
            삭제
          </Button>
          <Button
            type="button"
            color="black"
            size="medium"
            onClick={moveModifyPage}
          >
            수정
          </Button>
        </>
      )}
      {type === 'write' && user?._id && (
        <>
          <Button
            type="button"
            color="gray100"
            size="medium"
            onClick={handleClose}
          >
            취소
          </Button>
          <Button type="button" color="black" size="medium" onClick={submit}>
            등록
          </Button>
        </>
      )}
      {type === 'modify' && user?._id === content?.writer._id && (
        <>
          <Button
            type="button"
            color="gray100"
            size="medium"
            onClick={handleClose}
          >
            취소
          </Button>
          <Button type="button" color="black" size="medium" onClick={submit}>
            수정
          </Button>
        </>
      )}
    </PostButtonWrapper>
  );
}

const PostButtonWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  margin-bottom: 5em;
  margin-top: 4em;
  button + button {
    margin-left: 3em;
  }
`;
