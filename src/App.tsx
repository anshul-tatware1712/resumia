import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthPage } from "./Pages/AuthPage/AuthPage";
import Landing from "./Pages/Landing/Landing";
import Resumeia from "./Pages/Resumeai/Resumeia";
import Mainlayout from "./components/Layout/Mainlayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/register",
        element: <AuthPage />,
      },
      {
        path: "/login",
        element: <AuthPage />,
      },
      {
        path: "/form",
        element: <Resumeia />,
      },
    ],
  },
]);

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
};

export default App;
