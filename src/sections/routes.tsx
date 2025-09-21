// src/sections/Routes.tsx
import { Routes, Route } from "react-router-dom";
import GlobalLayout from "../layout/GlobalLayout";
import HomePage from "../pages/Homepage";
import AdminDashboard from "../pages/AdminDashboard";
import LoginPage from "../auth/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";


export default function AppRoutes() {
  return (
    <Routes>


      {/* LANDING: Header + Navbar + Footer */}
      <Route element={<GlobalLayout showTop />}>
        <Route path="/" element={<HomePage />} />
        {/* Agrega aquí más rutas públicas tipo landing si las necesitas */}
        {/* <Route path="/about" element={<AboutPage />} /> */}
      </Route>



      {/* INFORMATIVA / ADMIN: solo Footer */}
      <Route element={<GlobalLayout showTop={false} />}>
        <Route path="/admin" element={<AdminDashboard />} />
        {/* también podrías anidar subrutas: /admin/* */}
      </Route>

      {/* LOGIN: sin Header, sin Navbar, sin Footer */}
      <Route path="/login" element={<LoginPage />} />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
