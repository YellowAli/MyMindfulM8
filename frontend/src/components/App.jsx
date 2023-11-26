import "../styles/App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Mental from "./Mental";
import Social from "./Social";
import Physical from "./Physical";
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
      path: "/mental",
      element: <Mental setIsAuthenticated={setIsAuthenticated} />,
    },
    {
      path: "/social",
      element: <Social setIsAuthenticated={setIsAuthenticated} />,
    },
    {
      path: "/physical",
      element: <Physical setIsAuthenticated={setIsAuthenticated} />,
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
