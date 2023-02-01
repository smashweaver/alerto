import React, { useContext, useEffect, useMemo, useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { AppContext } from '../../contexts/appContext';
import { EventListView } from './EventListView';
import { DateBar } from '../../components';
import { EventModal } from './EventModal';
//import { debounce } from 'lodash';
import { useFocusEffect } from '@react-navigation/native';
import { useStream } from '../../hooks';
import { createTheme } from '../../themes';
import { Toolbar } from './Toolbar';
import { ActivityModal } from '../../components';

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
  const {
    user,
    profile,
    time,
    date,
    api: {
      getScheduleQuery,
      createScheduleFromTemplate,
    },
    stream: {
      createStream,
    },
  } = useContext(AppContext);
  const [coords] = useState({});
  const [scrollRef, setScrollRef] = useState(null);
  const [isShowEventModal, setShowEventModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isScheduleLoaded, setLoaded] = useState(false);
  const [, setToggle] = useState(false);
  const reRender = useMemo(() => debounce(() => setToggle(c => !c), 250), [date]);
  const finder = useRef(null);

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

  const tasks = useStream(qryEvents, reRender, createStream);
  const isEmpty = !tasks.length;

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
    if (!isScheduleLoaded) return;
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
    setShowEventModal(true);
  };

  const closeModal = () => {
    console.log('*** close modal');
    setShowEventModal(false);
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
    //createSchedule();
    setTimeout(() => setLoaded(true), 1000);

    return () => setLoaded(false);
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
    <View style={{flex:1}}>
      <View style={styles.container}>
        <Toolbar />
        <DateBar date={date} />
        <EmptyView hidden={isScheduleLoaded ? !isEmpty : true} />

        <NormalView
          hidden={isEmpty}
          coords={coords}
          tasks={tasks}
          openModal={openModal}
          setScrollRef={setScrollRef}
        />
      </View>

      <EventModal visible={isShowEventModal} close={closeModal} task={modalData} />
      <ActivityModal visible={!isScheduleLoaded} />
    </View>
  )
}

function NormalView({ coords, tasks, openModal, setScrollRef, hidden=false }) {
  const myStyle = hidden ? [styles.hidden] : [styles.shown];

  return (
    <ScrollView
        style={{marginTop:1}}
        ref={ref => setScrollRef(ref)}
        contentContainerStyle={myStyle}
        keyboardShouldPersistTaps='handled'
      >
        <EventListView
          openModal={openModal}
          coords={coords}
          list={tasks} />
      </ScrollView>
  )
}

function EmptyView({ hidden=false }) {
  const myStyle = hidden ? [styles.hidden] : [styles.flex, styles.shown];
  return (
    <View style={myStyle}>
      <View style={{padding: 24, borderWidth:1, borderColor:Theme.colors.primary, borderRadius:4}}>
        <Text style={{color:Theme.colors.text}}>
          You have no activities for the day.
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    height: '100%',
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  shown:{
    flexGrow: 8,
  },
  hidden: {
    display: 'none',
  },
  header: {
    backgroundColor: Theme.HeaderBackgroundColor,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  text: {
    color: Theme.colors.text,
  },
});
