import "../styles/App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";

import { useState } from "react";

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={`/${currentForm}`} replace />,
    },
    {
      path: "/login",
      element: <Login setCurrentForm={setCurrentForm} />,
    },
    {
      path: "/register",
      element: <Register setCurrentForm={setCurrentForm} />,
    },
    {
      path: "/home",
      element: <Home setCurrentForm={setCurrentForm} />,
    },
    {
      path: "/pg1",
      element: <Page1 setCurrentForm={setCurrentForm}/>,
    },
    {
      path: "/pg2",
      element: <Page2 setCurrentForm={setCurrentForm}/>,
    },
    {
      path: "/pg3",
      element: <Page3 setCurrentForm={setCurrentForm}/>,
    },
  
  
  ]);
  
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
