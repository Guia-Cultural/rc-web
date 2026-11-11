import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Location from "./pages/Location/Location";
import Roteiros from "./pages/Roteiros/Roteiros";
import "./App.css";
import "./styles/Global.css";
import "./styles/Reset.css";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) window.setTimeout(() => document.querySelector(hash)?.scrollIntoView(), 0);
    else window.scrollTo({ top: 0 });
  }, [hash, pathname]);
  return null;
}

function SiteRoutes() {
  return <><ScrollManager /><Header /><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/local" element={<Location />} />
    <Route path="/location" element={<Navigate to="/local" replace />} />
    <Route path="/roteiros" element={<Roteiros />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes><Footer /></>;
}

export default function App() {
  return <BrowserRouter><SiteRoutes /></BrowserRouter>;
}
