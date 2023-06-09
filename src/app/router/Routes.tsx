import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Index from "../pages/index/Index";
import Create from "../pages/create/Create";
import Edit from "../pages/edit/Edit";
import NotFound from "../pages/not-found/NotFound";

export const routes: RouteObject[] = [
  {
    path: "https://task-manager-alejodidiego.vercel.app/",
    element: <App />,
    children: [
      { path: "", element: <Index /> },
      { path: "create", element: <Create /> },
      { path: "edit/:id", element: <Edit /> },
      { path: "*", element: <NotFound /> },
      { path: "not-found", element: <NotFound /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
