import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayouts from "./layouts/MainLayouts";
import Home from "./pages/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",

      element: <MainLayouts />,

      children: [{ index: true, element: <Home /> }],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
