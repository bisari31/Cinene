import React, { useState } from 'react';
import styled from 'styled-components';

export default function SearchBar() {
  const [tag, setTag] = useState('');

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('태그 전송');
  };

  return (
    <SearchBarWrapper>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="태그 검색"
          value={tag}
          onChange={handleTagChange}
        />
        <button type="submit">검색</button>
      </form>
    </SearchBarWrapper>
  );
}

const SearchBarWrapper = styled.div`
  form {
    height: 30px;
    input {
      border: 1px solid ${({ theme }) => theme.colors.gray100};
      box-sizing: border-box;
      margin-right: 1em;
      padding: 0 1em;
    }
    button {
      border: none;
      width: 50px;
      color: #fff;
      background-color: ${({ theme }) => theme.colors.black};
    }
    input,
    button {
      border-radius: ${({ theme }) => theme.config.border2};
      font-size: 12px;
      height: 100%;
    }
  }
`;
