import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayouts from "./layouts/MainLayouts";
import Home from "./pages/Home";
import { LanguageProvider } from "./components/LanguageContext";

// Xizmat sahifalarini import qilish
import Gilam from "./pages/services/Gilam";
import Parda from "./pages/services/Parda";
import Korpa from "./pages/services/Korpa";
import Yakkandoz from "./pages/services/Yakkandoz";
import Mebel from "./pages/services/Mebel";
import Matras from "./pages/services/Matras";
import Kovrolin from "./pages/services/Kovrolin";
import Ofis from "./pages/services/Ofis";
import Antiseptik from "./pages/services/Antiseptik";
import Avto from "./pages/services/Avto";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayouts />,
      errorElement: <div>Marshrut xatosi</div>,
      children: [
        { index: true, element: <Home /> },

        // ⭐ 10 ta xizmat routelari
        { path: "gilam", element: <Gilam /> },
        { path: "parda", element: <Parda /> },
        { path: "korpa", element: <Korpa /> },
        { path: "yakkandoz", element: <Yakkandoz /> },
        { path: "mebel", element: <Mebel /> },
        { path: "matras", element: <Matras /> },
        { path: "kovrolin", element: <Kovrolin /> },
        { path: "ofis", element: <Ofis /> },
        { path: "antiseptik", element: <Antiseptik /> },
        { path: "avto", element: <Avto /> },
      ],
    },
  ]);

  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}

export default App;
