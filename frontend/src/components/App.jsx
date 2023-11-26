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

import { useState, useEffect } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // not authenticated initially
  const [isLoading, setIsLoading] = useState(true);

  // Check for authentication token on page load
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    console.log(authToken);

    if (authToken) {
      // Set authenticated state
      console.log("setting authenticated to true");
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? (
        <Navigate to="/home" replace />
      ) : (
        <Navigate to={"/login"} replace />
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
    // protect these routes when done
    {
      path: "/home",
      element: <Home setIsAuthenticated={setIsAuthenticated} />,
    },
    {
      path: "/pg1",
      element: <Page1 setIsAuthenticated={setIsAuthenticated} />,
    },
    {
      path: "/pg2",
      element: <Page2 setIsAuthenticated={setIsAuthenticated} />,
    },
    {
      path: "/pg3",
      element: <Page3 setIsAuthenticated={setIsAuthenticated} />,
    },
  ]);

  if (!isLoading)
    return (
      <div className="App">
        <RouterProvider router={router} />
      </div>
    );
}

export default App;
