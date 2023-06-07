import { makeAutoObservable, runInAction } from "mobx";
import { Task, TaskForm } from "../models/Task";
import { router } from "../router/Routes";
import { toast } from "react-hot-toast/headless";

export default class TaskStore {
  tasks: Task[] = [];

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
    }
  };

  deleteTask = (id: number) => {
    console.log(id);
    this.tasks = this.tasks.filter((x) => x.id != id);
    console.log(this.tasks);
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  };
}
