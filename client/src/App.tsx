import { Routes, Route } from 'react-router-dom';

import Layout from 'components/Layout';
import LandingPage from 'pages/LandingPage';
import LoginPage from 'pages/auth/LoginPage';
import PostDetailPage from 'pages/posts/PostDetailPage';
import PostWritePage from 'pages/posts/PostWritePage';
import RegisterPage from 'pages/auth/RegisterPage';
import MyPage from 'pages/MyPage';
import NotFound from 'components/NotFound';
import AuthHoc from 'components/hoc';

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
        <Route path="/post/write" element={<AuthPostWritePage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/post/:id/modify" element={<AuthPostModify />} />
        <Route path="/mypage" element={<AuthMypage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
