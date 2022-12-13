import React, { useContext, useEffect, useMemo, useState } from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import { AuthContext } from '../contexts/Authentication';
import { getScheduleQuery, createScheduleFromTemplate } from '../contexts/firebase';
import { onSnapshot } from "firebase/firestore";
import { EventListView } from '../components/EventListView';
import { debounce } from 'lodash';
import { format } from 'date-fns';

export default function Home() {
  const { user, date } = useContext(AuthContext)
  const [tasks] = useState([]);
  const [, setToggle] = useState(false);

  const today = useMemo(() => format(new Date(date), 'EEEE, PPP'), [date]);
  const reRender = useMemo(() => debounce(() => setToggle(c => !c), 250), [date]);

  const uid = useMemo(() => {
    const u = user || { uid: null };
    console.log('*** memoizing uid:', { uid: u.uid });
    return u.uid;
  }, [user]);

  const qryEvents = useMemo(() => {
    let qry = null;
    if (uid) {
      qry = getScheduleQuery(uid, date);
    }
    console.log('*** memoizing qryEvents', { uid, date, qryEvents: qry });
    return qry;
  }, [uid, date]);

  const createSchedule = async () => {
    await createScheduleFromTemplate(user.uid, date);
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
  };

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
    tasks.splice(0, tasks.length);
  }, []);

  useEffect(() => {
    console.log('*** date changes');
    createSchedule();
  }, [date]);

  useEffect(() => {
    console.log('*** qryEvents changes');
    const unsubscribe = listenToEvents(qryEvents);
    return () => unsubscribe();
  }, [qryEvents]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.today}>{today}</Text>
      <EventListView tasks={tasks} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5dbff',
  },
  today: {
    color: '#101113',
    paddingHorizontal: 4,
    paddingVertical: 4,
    backgroundColor: '#B197FC',
  },
  listContainer: {
    paddingTop: 10,
    padding: 20,
  },
});
