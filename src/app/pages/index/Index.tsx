import React, { useEffect } from "react";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { router } from "../../router/Routes";

const Index = () => {
  const { taskStore } = useStore();
  const { tasks, addTask } = taskStore;

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <div className="flex flex-col items-center gap-10 w-[80%]">
      <button
        className="bg-blue-500 text-white p-4 rounded-md font-bold shadow shadow-blue-500 "
        onClick={() => router.navigate("/task-manager/create")}
      >
        Add Task
      </button>

      <div className="w-full bg-blue-200">
        {Array.from(tasks).map((t) => (
          <p key={t[0]}>{t[1].title}</p>
        ))}
      </div>
    </div>
  );
};

export default observer(Index);
