import React, { FC } from 'react';
import { Button, Icon, ListItem } from 'react-native-elements';
import { ITask } from '../models';

interface ITaskprops {
  task : ITask;
  actions : {
    updateTask : (id: number, tast : ITask) => void;
    deleteTask : (id: number) => void;
  }
}

const Task : FC<ITaskprops> = ( { task, actions } ) => 
{
  return (
    <ListItem
      bottomDivider
    >
      <ListItem.CheckBox 
        checked={task.done} 
        onPress={() => task.id && actions.updateTask(task.id, {...task, done: !task.done})}
      />

      <ListItem.Content>
        <ListItem.Title>
          {task.description}
        </ListItem.Title>
      </ListItem.Content>

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
        onPress={() => task.id && actions.deleteTask(task.id)}
      />
    </ListItem>
  );
}

export default Task;