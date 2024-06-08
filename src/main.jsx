import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { Toaster } from "./components/ui/toaster.jsx";
import ScrollToTop from "./utils/helpers/scrollToTop.js";

// axios.defaults.baseURL = "https://back-teldip.onrender.com";
axios.defaults.baseURL = 'http://localhost:3001';

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
      <Toaster/>
      <ScrollToTop/>
        <App />
  </BrowserRouter>
);
