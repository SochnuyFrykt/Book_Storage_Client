import Navbar from "./components/layout/Navbar.tsx";
import {Outlet} from "react-router-dom";

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
