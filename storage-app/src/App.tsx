import {Outlet} from "react-router-dom";
import Navbar from "./components/layout/Navbar.tsx";

function App() {
  return (
    <>
      <Navbar/>
      <main style={{backgroundColor:"black"}}>
        <Outlet /> 
      </main>
    </>
  )
}

export default App
