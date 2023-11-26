import "../styles/App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Page1 from "./Page1";
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
      path: "/pg1",
      element: <Page1/>,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;