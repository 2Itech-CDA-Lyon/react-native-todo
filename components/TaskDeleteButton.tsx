import React, { FC, useContext } from "react";
import { Button, Icon } from "react-native-elements";
import { TaskContext } from "../contexts";

interface TaskDeleteButtonProps {
  id: number;
}

const TaskDeleteButton: FC<TaskDeleteButtonProps> = ({ id }) => {
  const { actions } = useContext(TaskContext);

  return (
    <Button
      buttonStyle={{ backgroundColor: "#E74C3C" }}
      icon={
        <Icon
          type="font-awesome"
          name="trash"
          size={20}
          color="white"
        />
      }
      onPress={() => actions.deleteTask(id)}
    />
  );
}

export default TaskDeleteButton;
