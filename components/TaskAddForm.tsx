import React, { FC , useContext, useState } from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { TaskContext } from '../contexts';


const TaskAddForm : FC = () => 
{
  const { actions } = useContext(TaskContext);

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
  );
}
  
export default TaskAddForm;
