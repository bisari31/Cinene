import { Routes, Route } from 'react-router-dom';

import NotFound from 'components/NotFound';
import Layout from 'components/Layout';

import LandingPage from 'pages/LandingPage';
import MyPage from 'pages/MyPage';
import DetailPage from 'pages/ContentDetailPage';
import AuthPage from 'pages/AuthPage';
import FavoritesPage from 'pages/FavoritesPage';
import SearchPage from 'pages/SearchPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<AuthPage key="login" />} />
        <Route path="/register" element={<AuthPage key="register" />} />
        <Route path="/kakao-register" element={<AuthPage key="kakao" />} />
        <Route path="/mypage" element={<MyPage />} />
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
