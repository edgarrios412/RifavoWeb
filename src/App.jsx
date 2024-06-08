import { Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio";
import SorteoDetail from "./pages/SorteoDetail";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/sorteo/:id" element={<SorteoDetail />} />
      </Routes>
    </>
  );
}

export default App;
