import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="">
      <nav className="bg-blue-400 h-16 w-full shadow shadow-black flex justify-center items-center">
        <h2 className="text-3xl font-bold text-white">Task Manager</h2>
      </nav>
      <div className="flex justify-center mt-9">
        <Outlet />
      </div>
    </div>
  );
}

export default observer(App);
