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

  // Renvoie l'état actuel de la liste des tâches et de l'avancement de la requête dans le composant
  // qui a appelé ce hook afin qu'il puisse adapter son affichage en fonction
  return {
    tasks,
    requestState,
  };
};

export default useFetchAllTasks;
