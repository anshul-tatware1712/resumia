import { Route, Routes } from "react-router-dom";
import { AuthPage } from "./Pages/AuthPage/AuthPage";
import Landing from "./Pages/Landing/Landing";
import Resumeia from "./Pages/Resumeai/Resumeia";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/form" element={<Resumeia />} />
      </Routes>
    </>
  );
}

export default App;
