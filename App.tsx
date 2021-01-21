import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useFetchAllTasks } from './hooks';
import { ITask } from './models';
import RequestState from './request-state';
import { TaskAddForm, TaskList }from './components'
import { TaskContext } from './contexts';


export default function App() {
  // Récupère la liste des tâches et les méthodes permettant de la transformer dans un hook personnalisé délégué à cet effet
  const { tasks, requestState, actions } = useFetchAllTasks();

  // Génère une fonction permettant de créer une nouvelle tâche
  const createTask = (newTask: ITask) => {
    // Envoie une requête dans l'API...
    fetch('http://localhost:3000/tasks', {
      // ...avec une méthode HTTP "POST" (création de contenu)...
      method: 'POST',
      // ...dont le contenu est encodé en JSON...
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      // ...et contenant l'objet décrivant la nouvelle tâche, préalablement converti en chaîne de caractères
      body: JSON.stringify(newTask),
    })
    // Lorsque la requête a répondu, convertit son contenu en objets JavaScript
    .then(response => response.json())
    // L'API renvoie une copie de l'objet tel que créé sur le serveur
    // Ajoute ce nouvel objet à la liste de tâches
    // Cela permet de s'assurer que l'affichage est bien synchronisé avec l'état réel des données sur le serveur
    // (par exemple, en cas d'erreur, la tâche n'est pas ajoutée à la liste)
    .then((json: ITask) => actions.addTask(json));
  }

  // Génère une fonction permettant de supprimer une tâche existante
  const deleteTask = (id: number) => {
    // Envoie une requête dans l'API...
    fetch(`http://localhost:3000/tasks/${id}`, {
      // ...avec une méthode HTTP "DELETE" (suppression de contenu)...
      method: 'DELETE',
    })
    // Lorsque la requête a répondu, convertit son contenu en objets JavaScript
    .then(response => response.json())
    // Retire l'objet ayant l'ID à supprimer de la liste des tâches
    // Cela permet de s'assurer que l'affichage est bien synchronisé avec l'état réel des données sur le serveur
    // (par exemple, en cas d'erreur, la tâche n'est pas supprimée de la liste)
    .then(() => actions.removeTask(id));
  }

  // Génère une fonction permettant de modifier une tâche existante
  const updateTask = (id: number, task: ITask) => {
    // Envoie une requête dans l'API...
    fetch(`http://localhost:3000/tasks/${id}`,{
      // ...avec une méthode HTTP "PUT" (remplacement de contenu)...
      method: 'PUT',
      // ...dont le contenu est encodé en JSON...
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      // ...et contenant l'objet décrivant la nouvelle tâche, préalablement converti en chaîne de caractères
      body: JSON.stringify(task)
    })
    // Lorsque la requête a répondu, convertit son contenu en objets JavaScript
    .then(response => response.json())
    // L'API renvoie une copie de l'objet tel que créé sur le serveur
    // Remplace l'objet ayant l'ID à modifier par cet objet dans la liste des tâches
    // Cela permet de s'assurer que l'affichage est bien synchronisé avec l'état réel des données sur le serveur
    // (par exemple, en cas d'erreur, la tâche n'est pas modifiée dans la liste)
    .then((json: ITask) => actions.updateTask(id, json));
  }

  const contextValue = {
    tasks,
    actions: {
      createTask,
      updateTask,
      deleteTask,
    }
  };

  // Tant que la requête est en cours, affiche un indicateur de chargement
  if (requestState === RequestState.Pending) {
    return <ActivityIndicator />;
  }
    
  // Dès que la requête a réussi, bascule sur l'affichage normal
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <TaskContext.Provider value={contextValue}>
          <TaskList />
          <TaskAddForm />
        </TaskContext.Provider>
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
