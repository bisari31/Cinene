import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useMutation, useQuery } from 'react-query';
import { useRecoilState } from 'recoil';

import { auth } from 'services/auth';
import { addPost, updatePost } from 'services/posts';
import { userIdState } from 'atom/user';

import { queryClient } from 'index';
import Comment from 'components/comment';
import PostButton from './PostButton';

export interface IPostFormProps {
  type: 'modify' | 'create' | 'view';
  content?: IPost;
}

export default function PostForm({ type, content }: IPostFormProps) {
  const [userId, setUserId] = useRecoilState(userIdState);
  const { mutate } = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post', `${content?.numId}`]);
      navigate(-1);
    },
  });
  const { mutate: addPostMutate } = useMutation(addPost, {
    onSuccess: () => {
      // queryClient.invalidateQueries(['posts']);
      navigate('/');
    },
  });
  const { data } = useQuery(['auth', userId], auth);
  const [post, setPost] = useState({
    title: '',
    body: '',
  });

  const navigate = useNavigate();

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
      if (type === 'modify' && content && data)
        return mutate({
          numId: content?.numId,
          userId: data?.user._id,
          ...post,
        });
      addPostMutate(post);
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
    <PostFormWrapper>
      {type === 'view' && (
        <PostHeader>
          <ImgWrapper>
            <p />
          </ImgWrapper>
          <Details>
            <div className="title_wrapper">
              <span>
                <b>{content?.writer.nickname}</b>
              </span>
            </div>
            <div className="desc_wrapper">
              <span>
                {dayjs(content?.createdAt).format('YYYY.MM.DD HH:MM')}
              </span>
              <span>조회수: {content?.views}</span>
            </div>
          </Details>
        </PostHeader>
      )}
      <form action="" onSubmit={handleSubmit}>
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
      {type === 'view' && <Comment postId={content?._id} userId={userId} />}
      <PostButton
        type={type}
        user={data?.user}
        content={content}
        submit={handleSubmit}
      />
    </PostFormWrapper>
  );
}

const PostFormWrapper = styled.article`
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
      border: 1px solid ${({ theme }) => theme.colors.gray100};
      padding: 1em;
    }
    input,
    textarea,
    button {
      border-radius: ${({ theme }) => theme.config.border2};
    }
  }
`;

const PostHeader = styled.div`
  border-radius: ${({ theme }) => theme.config.border2};
  display: flex;
  height: 50px;
  margin-bottom: 1em;
  padding: 0 1em;
`;

const ImgWrapper = styled.div`
  align-items: center;
  display: flex;
  margin-right: 1em;
  p {
    background-color: ${({ theme }) => theme.colors.gray100};
    border-radius: 50%;
    height: 40px;
    width: 40px;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .title_wrapper {
    b {
      font-weight: 500;
    }
    font-size: 16px;
  }
  .desc_wrapper {
    font-size: 12px;
    margin-top: 0.3em;
    span + span {
      margin-left: 0.3em;
    }
  }
`;
