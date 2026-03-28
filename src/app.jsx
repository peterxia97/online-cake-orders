import { useState, useEffect } from "react";
import Home from "./pages/home"
import Contact from "./pages/contact";

// 加载美团样式
function loadMeituanStyles() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/style.css';
  document.head.appendChild(link);
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // 监听路由变化
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    
    // 加载样式
    loadMeituanStyles();

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // 导航函数
  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // 渲染当前页面
  const renderPage = () => {
    if (currentPath === "/contact") {
      return <Contact />;
    }
    
    return <Home />;
  };

  return (
    <div className="app-container">
      {/* 简单的顶部导航（仅在非首页显示返回按钮） */}
      {currentPath !== "/" && (
        <header className="simple-header">
          <button 
            className="back-button"
            onClick={() => navigate("/")}
          >
            ← 返回
          </button>
          <h1>多糖星球蛋糕店</h1>
        </header>
      )}

      {/* 主内容 */}
      <main className="main-content">
        {renderPage()}
      </main>

      {/* 底部导航（仅在首页显示） */}
      {currentPath === "/" && (
        <footer className="simple-footer">
          <div className="footer-content">
            <p>© 2024 多糖星球蛋糕店 · 悉尼CBD店</p>
            <p>仅限自提 · 需提前2小时预订</p>
            <button 
              className="contact-link"
              onClick={() => navigate("/contact")}
            >
              联系客服
            </button>
          </div>
        </footer>
      )}

      <style jsx>{`
        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        .simple-header {
          background: linear-gradient(135deg, #ff6b8b, #ff8e53);
          color: white;
          padding: 15px;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .back-button {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 20px;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.3s;
        }
        
        .back-button:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        
        .simple-header h1 {
          font-size: 18px;
          margin: 0;
          font-weight: 600;
        }
        
        .main-content {
          flex: 1;
        }
        
        .simple-footer {
          background: #f5f5f5;
          padding: 20px 15px;
          text-align: center;
          border-top: 1px solid #eee;
        }
        
        .footer-content {
          max-width: 600px;
          margin: 0 auto;
        }
        
        .footer-content p {
          margin: 5px 0;
          color: #666;
          font-size: 13px;
        }
        
        .contact-link {
          background: #ff6b8b;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 20px;
          font-size: 14px;
          cursor: pointer;
          margin-top: 10px;
          transition: background 0.3s;
        }
        
        .contact-link:hover {
          background: #ff5a7a;
        }
      `}</style>
    </div>
  );
}