import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import NodeDrawer from "./components/NodeDrawer";
import MarkdownPage from "./components/MarkdownPage";
import Glossary from "./components/Glossary";
import Footer from "./components/Footer";

export default function App() {
  const { pathname } = useLocation();
  // páginas de texto começam do topo; abrir/fechar o painel não mexe no scroll da trilha
  useEffect(() => {
    if (pathname !== "/" && !pathname.startsWith("/n/")) window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/n/:id"
            element={
              <>
                <Home />
                <NodeDrawer />
              </>
            }
          />
          <Route path="/ajuda" element={<MarkdownPage name="ajuda" />} />
          <Route path="/glossario" element={<Glossary />} />
          <Route path="/sobre" element={<MarkdownPage name="sobre" />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
