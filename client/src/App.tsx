import Layout from 'components/Layout';
import LandingPage from 'pages/LandingPage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route index path="/login" element={<LoginPage />} />
        <Route index path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}
