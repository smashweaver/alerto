import { useEffect, useRef,  useState } from 'react';

export default function useStream(query, callback, createStream) {
  const [models] = useState([]);

  const unsubscribe = useRef(() => {});

  const sorter = () => {
    models.sort((x, y) => x.start - y.start);
    callback(models);
  };

  const findDataIndex = (data) => {
    return models.findIndex(task => task.id === data.id);
  };

  const addTask = (data) => {
    models.push(data);
    callback(models);
  };

  const removeTask = (data) => {
    const index = findDataIndex(data);
    if (index >= 0) {
      models.splice(index, 1);
      callback(models);
    }
  };

  const updateTask = (data) => {
    const index = findDataIndex(data);
    if (index >= 0) {
      models[index] = data;
      callback(models);
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

    unsubscribe.current = createStream(
      query,
      reducer,
      sorter,
    );
    return () => {
      console.log('*** unmounting useTasks');
      unsubscribe.current();
      models.splice(0, models.length);
    }
  }, []);

  return [...models];
}
