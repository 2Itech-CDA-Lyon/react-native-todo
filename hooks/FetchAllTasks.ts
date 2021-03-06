import { useState, useEffect } from "react";
import { ITask } from "../models";
import RequestState from "../request-state";


// Ceci est un hook personnalisé permettant d'aller récupérer la liste des tâches dans l'API
// Il permet de gérer toute la logique qui entoure cette fonctionnalité, de sorte qu'il ne soit pas nécessaire
// de l'écrire directement dans chaque composant
// Il permet également de réutiliser cette logique dans plusieurs composants différents
const useFetchAllTasks = () => {
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

  // Crée une fonction permettant d'ajouter une tâche aux tâches existantes
  const addTask = (newTask: ITask) => {
    // Remplace la liste de tâches actuelle par une nouvelle liste contenant...
    setTasks([
      // ...tout le contenu actuel de la liste...
      ...tasks,
      // ...ainsi que la nouvelle tâche
      newTask
    ]);
  }

  // Crée une fonction permettant de supprimer une tâche des tâches existantes
  const removeTask = (id: number) => {
    // Remplace la liste de tâches actuelle par une nouvelle liste...
    setTasks(
      // ...contenant uniquement les tâches qui n'ont pas l'ID demandé
      tasks.filter( (task) => task.id !== id)
    );
  }

  // Crée une fonction permettant de modifier une tâche parmi les tâches existantes
  const updateTask = (id: number, updatedTask: ITask) => {
    // Remplace la liste de tâches actuelle par une nouvelle liste...
    setTasks(
      // ...dans laquelle l'élément ayant l'ID demandé est remplacé par le nouvel objet fourni
      // et tous les autres gardent leur état actuel
      tasks.map(task => task.id === id ? updatedTask : task)
    );
  }

  // Renvoie l'état actuel de la liste des tâches et de l'avancement de la requête dans le composant
  // qui a appelé ce hook afin qu'il puisse adapter son affichage en fonction
  // Ainsi qu'une série de fonctions permettant au composant qui a appelé ce hook de transformer la
  // liste des tâches
  return {
    tasks,
    requestState,
    actions: {
      addTask,
      removeTask,
      updateTask
    }
  };
};

export default useFetchAllTasks;
