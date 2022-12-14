import React, { useContext, useEffect, useMemo, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { onSnapshot } from "firebase/firestore";
import { AuthContext } from '../contexts/Authentication';
import { getScheduleQuery, createScheduleFromTemplate } from '../contexts/firebase';
import { EventListView } from '../components/EventListView';
import { TopBar } from '../components/TopBar';
import { debounce } from 'lodash';
import { format } from 'date-fns';
import { useIsFocused } from '@react-navigation/native';

export default function Home() {
  const isFocused = useIsFocused();
  const { user, hour, date } = useContext(AuthContext)
  const [tasks] = useState([]);
  const [, setToggle] = useState(false);
  const [coords] = useState({});
  const [active, setActive] = useState(null);
  const [scrollRef, setScrollRef] = useState(null);

  const today = useMemo(() => format(new Date(date), 'EEEE, PPP'), [date]);
  const reRender = useMemo(() => debounce(() => setToggle(c => !c), 250), [date]);

  const uid = useMemo(() => {
    const u = user || { uid: null };
    // console.log('*** memoizing uid:', { uid: u.uid });
    return u.uid;
  }, [user]);

  const qryEvents = useMemo(() => {
    let qry = null;
    if (uid) {
      qry = getScheduleQuery(uid, date);
    }
    // console.log('*** memoizing qryEvents', { uid, date, qryEvents: qry });
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

  const scrollTo = (id) => {
    if (!scrollRef) return;
    const [x, y] = [0, coords[id]-10];
    console.log('*** scrollTo', {x, y, id});

    scrollRef.scrollTo({
      x, y, animated: true,
    });
  };

  const scrollToNearest = (oras) => {
    console.log('*** scroll to nearest', { oras });
    const t = setTimeout(() => {
      if (tasks.length === 0) return;

      let p = null;
      for(let i = tasks.length -1 ; i >= 0; i--) {
        if (tasks[i].start < oras) {
          p = tasks[i];
          break;
        }
      }
      if (p) { scrollTo(p.id); }
    }, 2000);
    return t;
  };

  useEffect(() => {
    console.log('*** mounting Home');
    tasks.splice(0, tasks.length);
  }, []);

  useEffect(() => {
    const t = scrollToNearest(hour);
    return () => clearTimeout(t);
  }, [hour, tasks.length]);

  useEffect(() => {
    console.log('*** date changes', { date });
    createSchedule();
  }, [date]);

  useEffect(() => {
    const unsubscribe = listenToEvents(qryEvents);
    return () => unsubscribe();
  }, [qryEvents]);

  useEffect(() => {
    console.log('*** scroll into view:', { isFocused, active, scrollTo: coords[active]});
    if (active) scrollTo(active);
    const t = scrollToNearest(hour);
    return () => clearTimeout(t);
  }, [active, isFocused]);

  return (
    <SafeAreaView edges={[]} style={styles.container}>
      <TopBar today={today} />
      <EventListView setScrollRef={setScrollRef} setActive={setActive} coords={coords} tasks={tasks} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5dbff',
  },
});
