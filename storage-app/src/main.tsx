import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./components/pages/home/HomePage.tsx";
import AddBookPage from "./components/pages/add_book/AddBookPage.tsx";
import About from "./components/pages/about/About.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <HomePage/>
      },
      {
        path: '/about',
        element: <About/>
      },
      {
        path: '/addbook',
        element: <AddBookPage/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
