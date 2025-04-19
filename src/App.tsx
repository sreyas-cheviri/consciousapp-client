import { Dashboard } from "./pages/Dashboard";
import { Auth } from "./pages/Auth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Provider } from 'react-redux';
import { store } from './store/store';

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/Signin", element: <Auth /> },
  { path: "/Signup", element: <Auth /> },
  { path: "/Dashboard", element: <Dashboard /> },
  { path: "/share/:hash", element: <Dashboard /> },
]);

function App() {
  return (
    <Provider store={store}>
      <div className="bg-zinc-950 dark:bg-zinc-300">
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
