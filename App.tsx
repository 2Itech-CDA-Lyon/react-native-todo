import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function App() {
  // Retient l'état actuel de la liste des tâches
  const [tasks, setTasks] = useState<any[]>([]);

  // Associe une action à la création du composant
  useEffect(
    () => {
      // Envoie une requête dans l'API pour récupérer toutes les tâches
      fetch('http://localhost:3000/tasks')
      // Dès que la requête a répondu, transforme la réponse en objets JavaScript
      .then(response => response.json())
      // Dès que la réponse a été transformée, range le résultat dans 
      .then( json => setTasks(json) );
    },
    // Liste de dépendances, liste vide = déclenchement de l'effet uniquement à la création du composant
    []
  );
  
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
