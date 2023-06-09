import ReactDOM from "react-dom/client";
import "./index.css";
import { StoreContext, store } from "./app/stores/store.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/Routes.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>
);
