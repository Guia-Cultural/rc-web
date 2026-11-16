/* ==========================================================================
   ROTAS DA APLICAÇÃO — React Router
   Inclui todas as rotas integradas do MVP Rota Cultural.
   ========================================================================== */
import { Navigate, Route, Routes } from "react-router-dom";
import AdminPage from "../pages/Admin/AdminPage";
import Community from "../pages/Community/Community";
import Explorar from "../pages/Explorar/Explorar";
import Home from "../pages/Home/Home";
import Location from "../pages/Location/Location";
import Roteiros from "../pages/Roteiros/Roteiros";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explorar" element={<Explorar />} />
      <Route path="/local" element={<Location />} />
      <Route path="/local/:id" element={<Location />} />
      <Route path="/location" element={<Navigate to="/local" replace />} />
      <Route path="/roteiros" element={<Roteiros />} />
      <Route path="/comunidade" element={<Community />} />
      <Route path="/blog" element={<Navigate to="/comunidade" replace />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
