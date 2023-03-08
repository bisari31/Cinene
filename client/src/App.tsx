import { Routes, Route } from 'react-router-dom';

import withAuth from 'components/hoc/withAuth';
import NotFound from 'components/NotFound';
import Layout from 'components/Layout';

import LandingPage from 'pages/LandingPage';
import MyPage from 'pages/MyPage';
import DetailPage from 'pages/ContentDetailPage';
import LoginPage from 'pages/LoginPage';
import FavoritesPage from 'pages/FavoritesPage';
import SearchPage from 'pages/SearchPage';

export default function App() {
  const AuthLoginPage = withAuth(LoginPage);
  const AuthRegisterPage = withAuth(LoginPage);
  const AuthMypage = withAuth(MyPage, true);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<AuthLoginPage />} />
        <Route path="/register" element={<AuthRegisterPage />} />
        <Route path="/kakao-register" element={<AuthRegisterPage />} />
        <Route path="/mypage" element={<AuthMypage />} />
        <Route path="/movie/:id" element={<DetailPage />} />
        <Route path="/tv/:id" element={<DetailPage />} />
        <Route path="/person/:id" element={<DetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Route>
      <Route path="/search" element={<SearchPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
