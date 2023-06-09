import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { router } from "../../router/Routes";
import Task from "../../components/tasks/Task";

const Index = () => {
  const { taskStore } = useStore();
  const { tasks } = taskStore;

  return (
    <div className="flex flex-col items-center gap-10 w-[80%]">
      <button
        className="bg-blue-500 text-white p-4 rounded-2xl font-bold transition-all shadow shadow-blue-500 hover:bg-black hover:shadow-black text-lg"
        onClick={() => router.navigate("create")}
      >
        Add Task
      </button>

      <div className="w-full flex flex-col gap-7 items-center">
        {tasks.map((t) => {
          console.log(t.id);
          return <Task key={t.id} task={t} />;
        })}
      </div>
    </div>
  );
};

export default observer(Index);
