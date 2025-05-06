
import { Routes, Route } from "react-router-dom";
import Home from "./Sidor/home";
import About from "./Sidor/produkter";
import Header from "./componenter/header";
import Footer from "./componenter/footer";
import Login from "./Sidor/login";
import Admin from "./Sidor/admin";


function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produkter" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} /> 
        </Routes>
      </main>
      <Footer /> 
    </>
  );
}

export default App;

