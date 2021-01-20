import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { ITask } from './models';
import RequestState from './request-state';


export default function App() {
  // Retient l'état actuel de la liste des tâches
  const [tasks, setTasks] = useState<ITask[]>([]);
  // Retient l'état d'avancement actuel de la requête
  const [requestState, setRequestState] = useState(RequestState.Idle);

  // Associe une action à la création du composant
  useEffect(
    () => {
      // Retient que la requête est en cours
      setRequestState(RequestState.Pending);
      // Envoie une requête dans l'API pour récupérer toutes les tâches
      fetch('http://localhost:3000/tasks')
      // Dès que la requête a répondu, transforme la réponse en objets JavaScript
      .then(response => response.json())
      // Dès que la réponse a été transformée, range le résultat dans 
      .then( (json: ITask[]) => {
        // Retient que la requête a réussi
        setRequestState(RequestState.Success);
        setTasks(json);
      })
      // En cas d'erreur, retient que la requête a échoué
      .catch( error => setRequestState(RequestState.Failed) );
    },
    // Liste de dépendances, liste vide = déclenchement de l'effet uniquement à la création du composant
    []
  );

  // Tant que la requête est en cours, affiche un indicateur de chargement
  if (requestState === RequestState.Pending) {
    return <ActivityIndicator />;
  }
  
  // Dès que la requête a réussi, bascule sur l'affichage normal
  return (
    <View style={styles.container}>
      <View>
        {tasks.map(
          (task, index) => <Text key={index}>{task.description}</Text>
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
