import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayouts from "./layouts/MainLayouts";
import Home from "./pages/Home";
import { LanguageProvider } from "./components/LanguageContext";
import emailjs from "@emailjs/browser";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",

      element: <MainLayouts />,

      children: [{ index: true, element: <Home /> }],
    },
  ]);
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}

export default App;
