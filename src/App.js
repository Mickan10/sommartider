
import { Routes, Route } from "react-router-dom";
import Home from "./Sidor/home";
import About from "./Sidor/produkter";
import Header from "./componenter/header";
import Footer from "./componenter/footer";


function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produkter" element={<About />} />
        </Routes>
      </main>
      <Footer /> 
    </>
  );
}

export default App;

