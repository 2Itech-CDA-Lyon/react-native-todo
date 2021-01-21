import React, { FC } from "react";
import { View } from "react-native";
import { Task } from ".";
import { ITask } from "../models";

interface TaskListProps {
  tasks: ITask[];
  actions : {
    updateTask : (id: number, task : ITask) => void;
    deleteTask : (id: number) => void;
  }
}

const TaskList: FC<TaskListProps> = ({ tasks, actions }) => {
  return (
    <View>
      {tasks.map(
        (task, index) =>
          <Task key={index} task={task} actions={{ ...actions }} />
      )}
    </View>
  );
}

export default TaskList;
