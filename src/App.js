
import { Outlet } from "react-router";  
import Header from "./componenter/header";
import Footer from "./componenter/footer";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet /> 
      </main>
      <Footer />
    </>
  );
}


