import { Routes, Route } from 'react-router-dom';

import Layout from 'components/Layout';
import LandingPage from 'pages/LandingPage';
import LoginPage from 'pages/auth/LoginPage';
import PostDetailPage from 'pages/posts/PostDetailPage';
import PostWritePage from 'pages/posts/PostWritePage';
import RegisterPage from 'pages/auth/RegisterPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route index path="/login" element={<LoginPage />} />
        <Route index path="/register" element={<RegisterPage />} />
        <Route index path="/post/write" element={<PostWritePage />} />
        <Route index path="/post/:id" element={<PostDetailPage />} />
      </Route>
    </Routes>
  );
}
