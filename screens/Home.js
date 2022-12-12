import React, { useContext, useEffect, useMemo, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { AuthContext } from '../contexts/Authentication';
import { getEventsQuery, createEventsFromTemplate } from '../contexts/firebase';
import { onSnapshot } from "firebase/firestore";
import { EventListView } from '../components/EventListView';
import { debounce } from 'lodash';

export default function Home() {
  const { user, date } = useContext(AuthContext)
  const [tasks] = useState([]);
  const [, setToggle] = useState(false);

  const reRender = useMemo(() => debounce(() => setToggle(c => !c), 250), [date]);

  const uid = useMemo(() => {
    console.log('*** memoizing uid');
    const u = user || { uid: null };
    return u.uid;
  }, [user]);

  const qryEvents = useMemo(() => {
    if (!uid) return null;

    return getEventsQuery(uid, date);
  }, [uid, date]);

  const createEvents = async () => {
    await createEventsFromTemplate(user.uid, date);
  };

  const findDataIndex = (data) => {
    return tasks.findIndex(task => task.id === data.id);
  };

  const sortTasks = () => {
    tasks.sort((x, y) => x.start - y.start);
    reRender();
  };

  const addTask = (data) => {
    tasks.push(data);
    reRender();
  };

  const removeTask = (data) => {
    const index = findDataIndex(data);
    if (index >= 0) {
      tasks.splice(index, 1);
      reRender();
    }
  };

  const updateTask = (data) => {
    const index = findDataIndex(data);
    if (index >= 0) {
      tasks[index] = data;
      reRender();
    }
  }

  const handleChange = (type, data) => {
    // console.log('*** change:', { type, data });
    if (type === 'added') return addTask(data);
    if (type === 'removed') return removeTask(data);
    if (type === 'modified') return updateTask(data);
  };

  const listenToEvents = (qryRef) => {
    if (!qryRef) return () => {};

    const unsubscribe = onSnapshot(qryRef, (snapshot) => {
      snapshot.docChanges().forEach(change => {
        const { type } = change;
        const { id } = change.doc;
        const data = { ...change.doc.data(), id };
        handleChange(type, data);
      })
      sortTasks();
    });
    return unsubscribe;
  };

  useEffect(() => {
    console.log('*** mounting Home');
    createEvents();
  }, []);

  useEffect(() => {
    console.log('*** qryEvents changed');
    const unsubscribe = listenToEvents(qryEvents);
    return () => unsubscribe();
  }, [qryEvents]);

  return (
    <SafeAreaView style={styles.container}>
      <EventListView tasks={tasks} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5dbff',
  },
  listContainer: {
    paddingTop: 10,
    padding: 20,
  },
});
