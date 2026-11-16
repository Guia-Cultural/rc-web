import { useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import AuthAccountModal from "./components/AccountModal/AuthAccountModal";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AppRoutes from "./routes/AppRoutes";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      window.setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 50);
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [hash, pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Header />
      <AppRoutes />
      <Footer />
      <AuthAccountModal />
    </BrowserRouter>
  );
}
