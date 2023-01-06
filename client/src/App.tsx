import { Routes, Route } from 'react-router-dom';
import AuthHoc from 'components/hoc';
import NotFound from 'components/NotFound';
import Layout from 'components/Layout';

import LandingPage from 'pages/LandingPage';

import MyPage from 'pages/MyPage';
import DetailPage from 'pages/DetailPage';
import LoginPage from 'pages/LoginPage';
import MobileSearch from 'components/header/MobileSearch';

export default function App() {
  const AuthLoginPage = AuthHoc(LoginPage);
  const AuthRegisterPage = AuthHoc(LoginPage);
  // const AuthPostWritePage = AuthHoc(PostWritePage, true);
  // const AuthPostModify = AuthHoc(PostDetailPage, true);
  const AuthMypage = AuthHoc(MyPage, true);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<AuthLoginPage />} />
        <Route path="/register" element={<AuthRegisterPage />} />
        <Route path="/mypage" element={<AuthMypage />} />
        <Route path="/movie/:id" element={<DetailPage />} />
        <Route path="/tv/:id" element={<DetailPage />} />
        <Route path="/person/:id" element={<DetailPage />} />
      </Route>
      <Route path="/search" element={<MobileSearch />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
