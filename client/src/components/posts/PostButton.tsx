import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { deletePost } from 'services/posts';
import { IPostFormProps } from './PostForm';

interface IProps extends IPostFormProps {
  user?: IUser;
  submit: (e: React.MouseEvent) => Promise<void>;
}

function PostButton({ type, user, content, submit }: IProps) {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate(-1);
  };

  const handleRemove = async () => {
    if (user?._id && content?.numId) {
      const response = await deletePost(content.numId, user._id);
      navigate('/');
      console.log(response);
    }
  };

  const moveModifyPage = () => {
    navigate(`post/${content?.numId}/modify`);
  };

  return (
    <PostButtonWrapper>
      {type === 'view' && user?._id === content?.writer._id && (
        <>
          <button type="button" onClick={handleRemove}>
            삭제
          </button>
          <button type="button" onClick={moveModifyPage} className="submit_btn">
            수정
          </button>
        </>
      )}
      {type === 'create' && user?._id && (
        <>
          <button type="button" onClick={handleClose}>
            취소
          </button>
          <button type="button" className="submit_btn" onClick={submit}>
            등록
          </button>
        </>
      )}
      {type === 'modify' && user?._id === content?.writer._id && (
        <>
          <button type="button" onClick={handleClose}>
            취소
          </button>
          <button type="button" className="submit_btn" onClick={submit}>
            수정
          </button>
        </>
      )}
    </PostButtonWrapper>
  );
}
export default React.memo(PostButton);

const PostButtonWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  button {
    border: none;
    font-size: 14px;
    height: 50px;
    margin-top: 4em;
    width: 200px;
    border-radius: ${({ theme }) => theme.config.border};
  }
  .submit_btn {
    color: #fff;
    background: ${({ theme }) => theme.colors.black};
  }
  button + button {
    margin-left: 3em;
  }
`;
