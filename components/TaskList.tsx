import React, { FC, useContext } from "react";
import { View } from "react-native";
import { Task } from ".";
import { TaskContext } from "../contexts";


const TaskList: FC = () => {
  const { tasks } = useContext(TaskContext);

  return (
    <View>
      {tasks.map(
        (task, index) =>
          <Task key={index} task={task} />
      )}
    </View>
  );
}

export default TaskList;
