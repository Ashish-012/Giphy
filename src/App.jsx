import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import Search from "./pages/Search";
import Categories from "./pages/Categories";
import Singlegif from "./pages/Singlegif";
import Favourites from "./pages/Favourites";
import Home from "./pages/Home";
import GiphyProvider from "./context/context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search/:id",
        element: <Search />,
      },
      {
        path: "/:categories",
        element: <Categories />,
      },
      {
        path: "/:type/:id",
        element: <Singlegif />,
      },
      {
        path: "/favourites",
        element: <Favourites />,
      },
    ],
  },
]);

function App() {
  return (
    <GiphyProvider>
      <RouterProvider router={router} />
    </GiphyProvider>
  );
}

export default App;
