import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useFetchAllTasks } from './hooks';
import RequestState from './request-state';


export default function App() {
  const { tasks, requestState } = useFetchAllTasks();

  // Tant que la requête est en cours, affiche un indicateur de chargement
  if (requestState === RequestState.Pending) {
    return <ActivityIndicator />;
  }
  
  // Dès que la requête a réussi, bascule sur l'affichage normal
  return (
    <View style={styles.container}>
      <View>
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
            </ListItem>
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
