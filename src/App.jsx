import { Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio";
import SorteoDetail from "./pages/SorteoDetail";
import NavBar from "./components/layout/NavBar";
import { useContext, useEffect } from "react";
import { UserContext } from "./components/context/UserContext";
import Footer from "./components/layout/Footer";

function App() {

  const { updateUsuario } = useContext(UserContext)

  useEffect(() => {
    updateUsuario()
  }, [])

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/sorteo/:id" element={<SorteoDetail />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
