import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="m-0 flex items-center justify-center min-h-screen text-gray-900 font-sans">
      <App />
    </div>
  </StrictMode>
);
