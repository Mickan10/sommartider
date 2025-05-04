
import { Routes, Route } from "react-router-dom";
import Home from "./Sidor/home";
import About from "./Sidor/produkter";
import Header from "./componenter/header";


function App() {
  return (
    <>
      <Header />
      <main style={{ padding: "2rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produkter" element={<About />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

