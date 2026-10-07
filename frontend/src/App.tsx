import { Routes, Route } from "react-router-dom";

import { Monitoring } from "./pages/Monitoring";
import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import { About } from "./pages/About";

function App() {
   return (
    <>
      <Header />
 
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/monitoramento" element={<Monitoring/>}/>
      <Route path="/sobre" element={<About />} />
      </Routes>
      </>
   );

}

export default App;
