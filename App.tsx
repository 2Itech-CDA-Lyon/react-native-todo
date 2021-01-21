import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Button, Icon, Input, ListItem } from 'react-native-elements';
import { useFetchAllTasks } from './hooks';
import { ITask } from './models';
import RequestState from './request-state';


export default function App() {
  const { tasks, requestState, actions } = useFetchAllTasks();

  const [newTaskDescription, setNewTaskDescription] = useState('');

  // Tant que la requête est en cours, affiche un indicateur de chargement
  if (requestState === RequestState.Pending) {
    return <ActivityIndicator />;
  }

  const createTask = () => {
    const newTask: ITask = {
      description: newTaskDescription,
      done: false,
    };

    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(newTask),
    })
    .then(response => response.json())
    .then((json: ITask) => actions.addTask(json));
  }

  const deleteTask = (id: number) => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(() => actions.removeTask(id));
  }

  // Dès que la requête a réussi, bascule sur l'affichage normal
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        {tasks.map(
          (task, index) =>
            <ListItem
              key={index}
              bottomDivider
            >
              <ListItem.CheckBox checked={false} />
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
                onPress={() => task.id && deleteTask(task.id)}
              />
            </ListItem>
        )}
        <Input
          label="Nouvelle tâche"
          placeholder="Entrez la description"
          onChangeText={text => setNewTaskDescription(text)}
          value={newTaskDescription}
        />
        <Button
          onPress={createTask}
          title="Ajouter"
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#fff',
  }
});
