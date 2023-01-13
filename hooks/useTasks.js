import { useEffect, useState } from 'react';

export default function useTasks(renderCallback) {
  const [tasks, setTasks] = useState([]);

  const findDataIndex = (data) => {
    return tasks.findIndex(task => task.id === data.id);
  };

  const addTask = (data) => {
    tasks.push(data);
    renderCallback();
  };

  const removeTask = (data) => {
    const index = findDataIndex(data);
    if (index >= 0) {
      tasks.splice(index, 1);
      renderCallback();
    }
  };

  const updateTask = (data) => {
    const index = findDataIndex(data);
    if (index >= 0) {
      tasks[index] = data;
      renderCallback();
    }
  };

  const reducer = (type, data) => {
    console.log('*** change:', { type, id: data.id });
    if (type === 'added') return addTask(data);
    if (type === 'removed') return removeTask(data);
    if (type === 'modified') return updateTask(data);
  };

  useEffect(() => {
    console.log('*** mounting useTasks');

    return () => setTasks([]);
  }, []);

  return [tasks, reducer];
}
