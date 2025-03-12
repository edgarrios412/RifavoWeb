import { Route, Routes, useLocation } from "react-router-dom";
import Inicio from "./pages/Inicio";
import SorteoDetail from "./pages/SorteoDetail";
import NavBar from "./components/layout/NavBar";
import { useContext, useEffect } from "react";
import { UserContext } from "./components/context/UserContext";
import Footer from "./components/layout/Footer";
import Apertura from "./pages/Apertura";
import Panel from "./pages/Panel";
import VerificarTicket from "./pages/VerificarTicket";

function App() {

  const { updateUsuario, usuario } = useContext(UserContext)

  const location = useLocation()

  const queryParams = new URLSearchParams(location.search);
  const refValue = queryParams.get('ref');

  useEffect(() => {
    if (refValue) {
      localStorage.setItem('ref', refValue)
    }
  }
    , [refValue])

  useEffect(() => {
    updateUsuario()
  }, [])

  return (
    <>
      <NavBar />
      <Routes>
        {/* <Route path="/" element={<Apertura />} /> */}
        <Route path="/" element={<Inicio />} />
        <Route path="/sorteo/:id" element={<SorteoDetail />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/verificarTicket/:id" element={<VerificarTicket />} />
      </Routes>
      {/* <Footer/> */}
      {(location.pathname != "/panel") && <Footer />}
    </>
  );
}

export default App;
