import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ConfigProvider } from "antd";

const customTheme: any = {
  components: {
    Pagination: {
      itemBorderRadius: 16,
    },
  },
  token: {
    colorPrimary: "#008080",
  },
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ToastContainer />
      <ConfigProvider theme={customTheme}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>
);
