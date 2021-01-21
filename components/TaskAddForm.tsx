import React, { FC , useState } from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { ITask } from '../models';

interface TaskAddFormProps {
  actions : {
    createTask : (newTask: ITask) => void;
  }
}

const TaskAddForm : FC<TaskAddFormProps> = ( {actions} ) => 
{
  // Retient l'état actuel du champ textxe "nom de la nouvelle tâche"
  const [newTaskDescription, setNewTaskDescription] = useState('');
  
  return (
    <View>
      <Input
        label="Nouvelle tâche"
        placeholder="Entrez la description"
        onChangeText={text => setNewTaskDescription(text)}
        value={newTaskDescription}
      />
      <Button
        onPress={() => actions.createTask({
          description: newTaskDescription,
          done: false,
        })}
        title="Ajouter"
      />
    </View>
    )      
  }
  
  export default TaskAddForm;