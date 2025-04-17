import { Dashboard } from "./pages/Dashboard";
import { Auth } from "./pages/Auth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/Signin", element: <Auth /> },
  { path: "/Signup", element: <Auth /> },
  { path: "/Dashboard", element: <Dashboard /> },
  { path: "/share/:hash", element: <Dashboard /> },
]);

function App() {
  return (
    <div className="bg-zinc-950 min-h-svh dark:bg-zinc-300">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
