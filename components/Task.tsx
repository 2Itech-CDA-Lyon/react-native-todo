import React, { FC, useContext } from 'react';
import { Button, Icon, ListItem } from 'react-native-elements';
import { TaskContext } from '../contexts';
import { ITask } from '../models';
import TaskDeleteButton from './TaskDeleteButton';

interface ITaskProps {
  task : ITask;
}

const Task : FC<ITaskProps> = ( { task } ) => 
{
  const { actions } = useContext(TaskContext);

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

      {task.id && <TaskDeleteButton id={task.id} />}
    </ListItem>
  );
}

export default Task;
