import { Routes, Route } from 'react-router-dom';

import AuthHoc from 'components/hoc';
import NotFound from 'components/NotFound';
import Layout from 'components/Layout';

import LandingPage from 'pages/LandingPage';
import LoginPage from 'pages/auth/LoginPage';
import RegisterPage from 'pages/auth/RegisterPage';
import PostPage from 'pages/posts/PostPage';
import PostWritePage from 'pages/posts/PostWritePage';
import PostDetailPage from 'pages/posts/PostDetailPage';

import MyPage from 'pages/MyPage';
import DetailPage from 'pages/detail/DetailPage';

export default function App() {
  const AuthLoginPage = AuthHoc(LoginPage);
  const AuthRegisterPage = AuthHoc(RegisterPage);
  const AuthPostWritePage = AuthHoc(PostWritePage, true);
  const AuthPostModify = AuthHoc(PostDetailPage, true);
  const AuthMypage = AuthHoc(MyPage, true);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<AuthLoginPage />} />
        <Route path="/register" element={<AuthRegisterPage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/post/write" element={<AuthPostWritePage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/post/:id/modify" element={<AuthPostModify />} />
        <Route path="/mypage" element={<AuthMypage />} />
        <Route path="/movie/:id" element={<DetailPage />} />
        <Route path="/tv/:id" element={<DetailPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
