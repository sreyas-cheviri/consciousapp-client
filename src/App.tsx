import { Dashboard } from "./pages/Dashboard";
import { Signin } from "./pages/Signin";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Signup } from "./pages/Signup";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/Signin", element: <Signin /> },
  { path: "/Signup", element: <Signup /> },
  { path: "/Dashboard", element: <Dashboard /> },
]);

function App() {
  return (
    <div className="bg-zinc-900 min-h-svh dark:bg-zinc-300">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
