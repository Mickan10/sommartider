
import { Routes, Route } from "react-router-dom";
import Home from "./Sidor/home";
import Produkter from "./Sidor/produkter";
import Header from "./componenter/header";
import Footer from "./componenter/footer";
import Login from "./Sidor/login";
import Admin from "./Sidor/admin";
import About from "./Sidor/about";


function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produkter" element={<Produkter />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} /> 
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer /> 
    </>
  );
}

export default App;

