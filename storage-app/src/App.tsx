import HomePage from "./components/pages/home/HomePage.tsx";
import {Outlet} from "react-router-dom";

function App() {
  return (
    <>
      <HomePage/>
      <main style={{backgroundColor:"black"}}>
        <Outlet /> 
      </main>
    </>
  )
}

export default App
