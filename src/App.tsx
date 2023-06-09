import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { useStore } from "./app/stores/store";
import { router } from "./app/router/Routes";

function App() {
  const { taskStore } = useStore();
  const { loadTasks } = taskStore;

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="">
      <Toaster />

      <nav className="bg-blue-600 h-16 w-full shadow shadow-blue-500 flex justify-center items-center">
        <h2
          onClick={() => router.navigate("/")}
          className="text-3xl font-bold text-white hover:text-slate-300 transition-all cursor-pointer"
        >
          Task Manager
        </h2>
      </nav>
      <div className="flex justify-center mt-9">
        <Outlet />
      </div>
    </div>
  );
}

export default observer(App);
