import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Index from "../pages/index/Index";
import Create from "../pages/create/Create";

export const routes: RouteObject[] = [
  {
    path: "/task-manager/",
    element: <App />,
    children: [
      { path: "", element: <Index /> },
      { path: "create", element: <Create /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
