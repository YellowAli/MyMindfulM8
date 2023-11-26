import "../styles/App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
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
    // other routes...
  ]);

  const toggleForm = () => {
    setCurrentForm(currentForm === 'login' ? 'register' : 'login');
  }

  

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
