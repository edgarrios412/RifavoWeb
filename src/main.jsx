import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { Toaster } from "./components/ui/toaster.jsx";
import ScrollToTop from "./utils/helpers/scrollToTop.js";
import { UserProvider } from "./components/context/UserProvider.jsx";
import { ThemeProvider } from "./components/theme-provider.jsx";

axios.defaults.baseURL = "https://rifavoback-hjoq.onrender.com";
// axios.defaults.baseURL = 'http://localhost:3001';

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <UserProvider>
        <Toaster />
        <ScrollToTop />
        <App />
        {/* <MailDesign/> */}
      </UserProvider>
    </ThemeProvider>
  </BrowserRouter>
);
