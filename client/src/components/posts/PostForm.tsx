import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface IType {
  type: 'edit' | 'create';
}

export default function PostForm() {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/posts/write', post);
      navigate('/');
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseBtn = () => {
    navigate(-1);
  };
  return (
    <PostFormWrapper>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
        />
        <textarea
          name="body"
          rows={25}
          value={post.body}
          onChange={handleChange}
        />
        <div>
          <button type="button" onClick={handleCloseBtn}>
            취소
          </button>
          <button type="submit" className="submit_btn">
            등록
          </button>
        </div>
      </form>
    </PostFormWrapper>
  );
}

const PostFormWrapper = styled.div`
  form {
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
    div {
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
    }
  }
`;
