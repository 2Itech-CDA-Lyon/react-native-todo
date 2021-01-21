import { createContext } from "react";
import { ITask } from "../models";

interface TaskContextValue {
  tasks: ITask[];
  actions: {
    createTask: (task: ITask) => void;
    deleteTask: (id: number) => void;
    updateTask: (id: number, task: ITask) => void;
  }
}

const TaskContext = createContext<TaskContextValue>({
  tasks: [],
  actions: {
    createTask: () => {},
    deleteTask: () => {},
    updateTask: () => {},
  }
});

export default TaskContext;
