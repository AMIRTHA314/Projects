
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize light theme if no theme is set
if (!localStorage.getItem("theme")) {
  localStorage.setItem("theme", "light");
  document.documentElement.classList.remove("dark");
}

createRoot(document.getElementById("root")!).render(<App />);
