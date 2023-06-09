interface Task {
  id: number;
  title: string;
  content: string;
  creationDate: Date;
  finishedDate: Date | null;
  finished: boolean;
}

interface TaskForm {
  title: string;
  content: string;
  id?: number;
}

export type { Task, TaskForm };
