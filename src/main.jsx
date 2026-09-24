import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import History from "./components/History.jsx";
import GlobalProvider from "./context/GlobalProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* El Provider envuelve toda la app para que todos lean el contexto */}
    <GlobalProvider>
      <div className="grid grid-cols-[auto_1fr] h-screen">
        <History />
        <App />
      </div>
    </GlobalProvider>
  </StrictMode>,
);
