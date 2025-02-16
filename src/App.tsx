
import { Dashboard } from "./pages/Dashboard";
import { Signin } from "./pages/Signin";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Signup } from "./pages/Signup";

const router =  createBrowserRouter([
  // {path: "/", element: <HomePage/>},
  {path: "/Signin", element: <Signin/>},
  {path: "/Signup", element: <Signup/>},
  {path: "/Dashboard", element: <Dashboard/>},

])

function App() {
  return <RouterProvider router={router}/>;

}

export default App;
