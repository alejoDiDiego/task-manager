import { makeAutoObservable, runInAction } from "mobx";
import { Task, TaskForm } from "../models/Task";
import { router } from "../router/Routes";
import { toast } from "react-hot-toast";

export default class TaskStore {
  tasks: Task[] = [];
  loadingTask = false;
  selectedTask: Task | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  private generateRandomId() {
    let id = Math.floor(Math.random() * 1000000);
    return id;
  }

  addTask = (task: TaskForm) => {
    const id = this.generateRandomId();
    const t: Task = {
      id: id,
      content: task.content,
      title: task.title,
      creationDate: new Date(),
      finishedDate: null,
      finished: false,
    };
    this.tasks.unshift(t);

    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    console.log(JSON.parse(localStorage.getItem("tasks")!));
    router.navigate("/task-manager/");
    toast.success("Task created");
  };

  loadTasks = async () => {
    console.log(this.tasks);
    if (JSON.parse(localStorage.getItem("tasks")!) != null) {
      const t: Task[] = await JSON.parse(localStorage.getItem("tasks")!);
      runInAction(() => {
        this.tasks = t;
        console.log(t);

        console.log(this.tasks);
      });
    }
    return;
  };

  finishOrUnfinishTask = async (id: number) => {
    const t = this.tasks.find((x) => x.id == id);
    if (t != null) {
      const index = this.tasks.findIndex((x) => x.id == id);
      t.finished = !t.finished;
      if (t.finished) {
        t.finishedDate = new Date();
      } else {
        t.finishedDate = null;
      }
      this.tasks[index] = t;
      console.log(this.tasks);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      return;
    }
    toast.error("Task does not exists");
  };

  deleteTask = (id: number) => {
    console.log(id);
    this.tasks = this.tasks.filter((x) => x.id != id);
    console.log(this.tasks);
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    toast.success("Task deleted");
  };

  loadTask = async (id: number) => {
    this.setLoading(true);
    if (this.tasks.length == 0) {
      console.log("loading");
      await this.loadTasks();
    }
    runInAction(() => {
      console.log(this.tasks);
      const t = this.tasks.find((ts) => ts.id == id);
      if (t != null) {
        console.log(t);
        this.selectedTask = t;
        this.setLoading(false);
        return;
      }
      router.navigate("/task-manager/not-found");
      this.setLoading(false);
      toast.error("Task does not exists");
    });
  };

  updateTask = async (task: TaskForm) => {
    const t = this.tasks.find((x) => x.id == task.id);
    if (t != null) {
      const index = this.tasks.findIndex((x) => x.id == task.id);
      t.content = task.content;
      t.title = task.title;
      this.tasks[index] = t;
      console.log(this.tasks);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      router.navigate("/task-manager/");
      toast.success("updateTask updated");
      return;
    }
    toast.error("Task does not exists");
  };

  setLoading = (value: boolean) => {
    this.loadingTask = value;
  };
}
