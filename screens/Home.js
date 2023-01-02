import React, { useContext, useEffect, useMemo, useState, useRef } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { onSnapshot } from "firebase/firestore";
import { AuthContext } from '../contexts/Authentication';
import { getScheduleQuery, createScheduleFromTemplate } from '../contexts/firebase';
import { EventListView } from '../components/EventListView';
import { TopBar } from '../components/TopBar';
import { useIsFocused } from '@react-navigation/native';
import { EventModal } from '../components/EventModal';
import { debounce } from 'lodash';
import { createTheme } from '../themes';

export default function Home() {
  const isFocused = useIsFocused();
  const { user, time, date, active, colorScheme } = useContext(AuthContext)
  const [tasks] = useState([]);
  const [, setToggle] = useState(false);
  const [coords] = useState({});
  const [scrollRef, setScrollRef] = useState(null);
  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState(null);
  const Theme = createTheme(colorScheme);

  const reRender = useMemo(() => debounce(() => setToggle(c => !c), 250), [date]);

  const t = useRef(null);

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

  const createSchedule = () => {
    createScheduleFromTemplate(user.uid, date);
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
    if (!id) return;
    if (!scrollRef) return;
    const [x, y] = [0, coords[id]-10];
    // console.log('*** scrollTo', {x, y, id});
    scrollRef.scrollTo({
      x, y, animated: true,
    });
  };

  const scrollToNearest = (t) => {
    const timeout = setTimeout(() => {
      if (tasks.length) {
        console.log('*** scroll to nearest', t);
        let p = null;
        for(let i = tasks.length -1 ; i >= 0; i--) {
          p = tasks[i];
          if (p.start < t) break;
        }
        if (p) { scrollTo(p.id); }
      }
    }, 1000);
    return timeout;
  };

  const openModal = (activity) => {
    console.log('*** open modal:', activity.title);
    setModalData(activity);
    setVisible(true);
  };

  const closeModal = () => {
    console.log('*** close modal');
    setVisible(false);
    setModalData(null);
  };

  useEffect(() => {
    console.log('*** mounting Home');
    tasks.splice(0, tasks.length);
    return () => clearTimeout(t.current);
  }, []);

  useEffect(() => {
    console.log('*** date changes', { date });
    createSchedule();
  }, [date]);

  useEffect(() => {
    const unsubscribe = listenToEvents(qryEvents);
    return () => unsubscribe();
  }, [qryEvents]);

   useEffect(() => {
    console.log('*** active changed:', active)
    if (active) scrollTo(active);
  }, [active, scrollRef]);

  useEffect(() => {
    console.log('*** time changed:', time);
    clearTimeout(t.current);
    t.current = scrollToNearest(time);
   }, [time, scrollRef]);

  useEffect(() => {
    if (!isFocused) return;
    console.log('*** isFocused changed:', isFocused);
    clearTimeout(t.current);
    t.current = scrollToNearest(time);
  }, [isFocused, scrollRef]);

  return (
    <SafeAreaView edges={[]} style={{ flex: 1 }}>
      <TopBar date={date} />
      <ScrollView
        ref={ref => setScrollRef(ref)}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'
      >
        <EventListView
          openModal={openModal}
          coords={coords}
          list={[...tasks]} />
      </ScrollView>

      {visible &&
        <EventModal close={closeModal} task={modalData} />}
    </SafeAreaView>
  )
}
