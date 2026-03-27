import Home from "./pages/Home";
import Contact from "./pages/Contact";

export default function App() {
  const path = window.location.pathname;

  if (path === "/contact") {
    return <Contact />;
  }

  return <Home />;
}