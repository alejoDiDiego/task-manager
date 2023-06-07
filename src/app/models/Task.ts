interface Task {
  id: number;
  title: string;
  content: string;
  creationDate: number;
  finishedDate: Date | null;
  finished: false;
}

interface TaskForm {
  title: string;
  content: string;
}

export type { Task, TaskForm };
