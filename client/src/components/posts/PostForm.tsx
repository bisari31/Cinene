import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

import { addPost, updatePost } from 'services/posts';

import { queryClient } from 'index';
import { useAuthQuery } from 'hooks/useAuthQuery';
import CommentWrapper from 'components/comment';
import PostButton from './PostButton';
import PostHeader from './PostHeader';

export interface IPostFormProps {
  type: 'modify' | 'write' | 'view';
  content?: IPost;
}

export default function PostForm({ type, content }: IPostFormProps) {
  const [post, setPost] = useState({
    title: '',
    body: '',
  });

  const navigate = useNavigate();
  const { data: auth } = useAuthQuery();

  const { mutate } = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post', `${content?._id}`]);
      navigate(-1);
    },
  });

  const { mutate: addPostMutate } = useMutation(addPost, {
    onSuccess: () => {
      navigate('/');
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent,
  ) => {
    e.preventDefault();
    try {
      switch (type) {
        case 'modify':
          return mutate({
            postId: content?._id as string,
            userId: auth?.user._id as string,
            ...post,
          });
        case 'write':
          return addPostMutate(post);
        case 'view':
          return navigate(`post/${content?._id}/modify`);
        default:
          return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if ((type === 'view' || type === 'modify') && content) {
      setPost({
        title: content?.title,
        body: content?.body,
      });
    }
  }, [content, type]);

  return (
    <PostFormWrapper isViewPage={type === 'view'}>
      <form action="" onSubmit={handleSubmit}>
        {type === 'view' && <PostHeader content={content} />}
        <input
          readOnly={type === 'view'}
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
        />
        <textarea
          readOnly={type === 'view'}
          name="body"
          rows={25}
          value={post.body}
          onChange={handleChange}
        />
      </form>
      {type === 'view' && <CommentWrapper postId={content?._id} />}
      {auth?.isLoggedIn && (
        <PostButton
          type={type}
          user={auth?.user}
          content={content}
          submit={handleSubmit}
        />
      )}
    </PostFormWrapper>
  );
}

const PostFormWrapper = styled.article<{ isViewPage: boolean }>`
  & > form {
    display: flex;
    flex-direction: column;
    input {
      height: 40px;
    }
    textarea {
      margin-top: 2em;
      resize: none;
    }

    input,
    textarea {
      background-color: ${({ theme, isViewPage }) =>
        isViewPage ? theme.colors.gray50 : 'none'};
      border: ${({ theme, isViewPage }) =>
        isViewPage ? 'none' : `1px solid ${theme.colors.gray100}`};
      border-radius: ${({ theme }) => theme.config.border};
      padding: 1em;
      input,
      textarea {
        border-radius: ${({ theme }) => theme.config.border};
      }
    }
  }
`;
