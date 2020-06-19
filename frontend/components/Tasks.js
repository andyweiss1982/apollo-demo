import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  CREATE_TASK_MUTATION,
  DELETE_TASK_MUTATION,
  TASKS_QUERY,
} from "../graphql";

const Tasks = () => {
  const { data: tasksData, loading: tasksLoading } = useQuery(TASKS_QUERY);
  const [createTask] = useMutation(CREATE_TASK_MUTATION);
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION);
  const [task, setTask] = useState({ description: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    createTask({
      variables: { description: task.description },
      refetchQueries: [{ query: TASKS_QUERY }],
    });
    setTask({ description: "" });
  };

  const handleDelete = (task) => {
    deleteTask({
      variables: { id: task.id },
      refetchQueries: [{ query: TASKS_QUERY }],
    });
  };

  const numberOfTasks = tasksData?.tasks?.length;

  useEffect(() => {
    document.title = `You have ${numberOfTasks} tasks!`;
  }, [numberOfTasks]);

  if (tasksLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          value={task.description}
          onChange={(event) => setTask({ description: event.target.value })}
        />
      </form>
      <ul className="no-dots">
        {tasksData.tasks.map((task) => (
          <li key={task.id}>
            {task.description}
            <button onClick={() => handleDelete(task)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Tasks;
