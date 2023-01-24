import React, { useContext, useEffect, useMemo, useState, useRef } from 'react';
import { View, ScrollView } from 'react-native';
import { AppContext } from '../../contexts/appContext';
import { EventListView } from './EventListView';
import { DateBar } from '../../components/DateBar';
import { EventModal } from './EventModal';
//import { debounce } from 'lodash';
import { useFocusEffect } from '@react-navigation/native';
import { useStream } from '../../hooks';
import { createTheme } from '../../themes';
import { Toolbar } from './Toolbar';

const debounce = (func, delay = 1000) => {
  let debounceTimer
  return function() {
    const context = this
    const args = arguments
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => func.apply(context, args), delay)
  }
}

const Theme = createTheme();

export default function Home() {
  const { user, profile, time, date, api, stream } = useContext(AppContext);
  const [coords] = useState({});
  const [scrollRef, setScrollRef] = useState(null);
  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [scheduleIsLoaded, setLoaded] = useState(false);
  const [, setToggle] = useState(false);
  const reRender = useMemo(() => debounce(() => setToggle(c => !c), 250), [date]);
  const finder = useRef(null);

  const {
    getScheduleQuery,
    createScheduleFromTemplate,
  } = api;

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

  const [tasks] = useStream(qryEvents, reRender, stream.createStream);

  const createSchedule = () => {
    setLoaded(false);
    createScheduleFromTemplate(profile, user.uid, date)
    .then(() => setLoaded(true));
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

  const scrollToNearest = (start) => {
    if (!scheduleIsLoaded) return;
    clearTimeout(finder.current);
    finder.current = setTimeout(() => {
      if (tasks.length) {
        let p = null;
        for(let i = tasks.length -1 ; i >= 0; i--) {
          p = tasks[i];
          if (p.start < start) break;
        }
        if (p) { scrollTo(p.id); }
      }
    }, 1000);
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

    return () => {
      console.log('*** unmounting Home');
      clearTimeout(finder.current);
    }
  }, []);

  useEffect(() => {
    console.log('*** date changes', { date });
    createSchedule();
  }, [date]);

  useEffect(() => {
    console.log('*** time changed:', time);
    scrollToNearest(time);
  }, [time]);

  useFocusEffect(() => {
    console.log('*** screen changed: Home');
    scrollToNearest(time);
  });

  return (
    <View edges={[]} style={{ flex: 1 }}>
      <Toolbar />
      <DateBar date={date} />

      <ScrollView
        style={{marginTop: 1}}
        ref={ref => setScrollRef(ref)}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'
      >
        <EventListView
          openModal={openModal}
          coords={coords}
          list={tasks} />
      </ScrollView>

      {visible ? <EventModal close={closeModal} task={modalData} /> : null}
    </View>
  )
}
