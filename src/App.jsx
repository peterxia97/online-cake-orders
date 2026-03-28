import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Contact from "./pages/Contact";

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  const renderPage = () => {
    if (currentPath === "/contact") {
      return <Contact />;
    }
    return <Home />;
  };

  return (
    <div className="app-container">
      {/* 顶部导航（非首页显示） */}
      {currentPath !== "/" && (
        <header className="simple-header">
          <button className="back-button" onClick={() => navigate("/")}>
            ← 返回
          </button>
          <h1>多糖星球蛋糕店</h1>
        </header>
      )}

      {/* 主内容 */}
      <main className="main-content">{renderPage()}</main>

      {/* 底部导航（仅首页显示） */}
      {currentPath === "/" && (
        <footer className="simple-footer">
          <div className="footer-content">
            <p>© 2024 多糖星球蛋糕店 · 悉尼 CBD 店</p>
            <p>仅限自提 · 需提前 2 小时预订</p>
            <button
              className="contact-link"
              onClick={() => navigate("/contact")}
            >
              联系客服
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}