import { makeAutoObservable } from "mobx";
import { Task, TaskForm } from "../models/Task";
import { router } from "../router/Routes";

export default class TaskStore {
  tasks = new Map<number, Task>();

  constructor() {
    makeAutoObservable(this);
  }

  private generateRandomId() {
    let id = Math.floor(Math.random() * 1000000);
    while (this.tasks.has(id)) {
      id = Math.floor(Math.random() * 1000000);
    }
    return id;
  }

  addTask = (task: TaskForm) => {
    const id = this.generateRandomId();
    const t: Task = {
      id: id,
      content: task.content,
      title: task.title,
      creationDate: Date.now(),
      finishedDate: null,
      finished: false,
    };
    this.tasks.set(id, t);
    router.navigate("/task-manager/");
  };
}
