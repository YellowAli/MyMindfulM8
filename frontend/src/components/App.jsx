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

import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // not authenticated initially

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? (
        <Navigate to="/home" replace />
      ) : (
        <Navigate to={'/login'} replace />
      ),
    },
    {
      path: "/login",
      element: <Login setIsAuthenticated={setIsAuthenticated} />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: isAuthenticated ? <Home /> : <Navigate to="/login" />,
    },
    {
      path: "/pg1",
      element: isAuthenticated ? <Page1 /> : <Navigate to="/login" />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
