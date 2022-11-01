import axios from 'axios';

export const getPosts = async () => {
  const { data } = await axios.get<IPostsData>('/posts');
  return data.posts;
};
