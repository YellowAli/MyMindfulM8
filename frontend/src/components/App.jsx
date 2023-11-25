import "../styles/App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="login" />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "home",
      element: <Home />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
