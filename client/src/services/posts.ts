import axios from 'axios';

export const getPosts = async () => {
  const { data } = await axios.get<IPostsData>('/posts');
  return data.posts;
};
export const getPost = async (id: string | undefined) => {
  if (!id) return;
  const { data } = await axios.get<IPost>(`/posts/${id}`);
  return data;
};

export const addPost = async (post: { title: string; body: string }) => {
  const { data } = await axios.post('/posts/write', post);
  return data;
};

export const deletePost = async (postId: number, userId: string) => {
  try {
    const { data } = await axios.delete(`/posts/${postId}`, {
      data: { id: userId },
    });
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.data);
    }
  }
};

export const updatePost = async (
  body: IPostUpdateBody,
  // userId: string,
  // body: { title: string; body: string },
) => {
  try {
    const { data } = await axios.put(`/posts/${body.numId}`, {
      ...body,
    });
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
  }
};
