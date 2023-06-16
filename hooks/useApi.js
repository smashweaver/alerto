import {
  doc,
  addDoc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

import { cycleToEventsMap, chronotypeToEventsMap } from '../constants';
import { canOccure } from '../utils';
import uuid from 'react-native-uuid';
import UserStorage from './userStorage';

export default function useApi(db) {
  const getEventsByDate = async (ownerId, targetDate) => {
    console.log('*** getEventsByDate', { targetDate });
    const store = new UserStorage(ownerId);
    const profile = await store.getProfile();
    const { events, dated } = profile;

    const result = [];

    events.forEach(data => {
      if (!canOccure(targetDate, data.occurence)) return;
      const {
        id,
        title,
        hour,
        min,
        duration,
        note,
        alert,
        custom,
      } = data;
      const start = hour * 60 + min;
      result.push({
        id,
        title,
        hour,
        min,
        duration,
        note,
        alert,
        custom,
        start,
        isEditable: false,
        isDated: false,
      });
    });

    (dated[targetDate] || []).forEach(data => {
      const {
        id,
        title,
        hour,
        min,
        duration,
        note,
        alert,
        custom,
      } = data;
      const start = hour * 60 + min;
      result.push({
        id,
        title,
        hour,
        min,
        duration,
        note,
        alert,
        custom,
        start,
        isEditable: true,
        isDated: true,
      });
    })

    return result;
  };

  const getEventsForNotification = async (ownerId, date, time) => {
    // console.log('*** getEventsForNotification', { ownerId, date, time});
    const events = await getEventsByDate(ownerId, date);
    // console.log(events);
    /* const colRef = collection(db, 'events');
    const qryRef = query(colRef,
      where('owner_id', '==', ownerId),
      where('date', '==', date),
      where('start', '==', time)
    );
    const snap = await getDocs(qryRef);

    if (!snap.empty) {
      return snap.docs.map(x => {
        return { ...x.data(), id: x.id };
      });
    } */
    return events.filter(x => x.start === time);
  };

  const getScheduleQuery = (ownerId, date) => {
    if (!ownerId) return null;

    const colRef = collection(db, 'events');
    return query(colRef, where('owner_id', '==', ownerId), where('date', '==', date));
  };

  const getLogsQuery = (ownerId, date) => {
    if (!ownerId) return null;

    const colRef = collection(db, 'logs');
    return  query(colRef, where('owner_id', '==', ownerId), where('date', '==', date));
  };

  const retrieveEventById = async (id) => {
    const docRef = doc(db, 'events', id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  };

  const createEvent = async (ownerId, date, data) => {
    const eventRef = collection(db, 'events');
    const start = data.hour * 60 + data.min;
    // const ts =  uuid.v4();
    const payload = { ...data, owner_id: ownerId, date, start }

    const { id } = await addDoc(eventRef, payload);
    const docData = await retrieveEventById(id);
    return { ...docData, id };
  };

  const updateEvent = async (id, data) => {
    const eventRef = doc(db, 'events', id);
    console.log('*** updateEvent:', { id, data });
    return await updateDoc(eventRef, data);
  };

  const createScheduleFromTemplate = async (profile, ownerId, date) => {
    if (!ownerId) return null;

    const qryLogs = getLogsQuery(ownerId, date);
    try {
      // check log entry before generating event docs from schedule
      const snapshot = await getDocs(qryLogs);
      if (!snapshot.size) {
        // create event doc for every activity in the given schedule
        const { events } = profile;
        const eventRef = collection(db, 'events');

        // console.log('*** createScheduleFromTemplate', {events});
        events.forEach(async data => {
          if (data.disabled) return;
          if (!canOccure(date, data.occurence)) return;
          const {
            title,
            hour,
            min,
            duration,
            note,
            alert,
            custom,
            disable,
          } = data;
          const start = hour * 60 + min;
          await addDoc(eventRef, {
            title,
            hour,
            min,
            duration,
            note,
            alert,
            custom,
            disable,
            owner_id: ownerId,
            is_done: false,
            date,
            start
          });
        });

        // create a log entry
        const logRef = collection(db, 'logs');
        await addDoc(logRef, { owner_id: ownerId, date });
      }
    } catch(error) {
      console.log('*** generateEvents:error', error);
    }
  };

  const createWeekendSchedule = async (date) => {
    return [
      {
        title: 'Rest and Recreation',
        hour: 8,
        min: 0,
        all_day: true,
        alert: 0,
      }
    ];
  };

  const removeEventById = async (id) => {
    console.log('*** removeEventFromSchedule:', id);
    await deleteDoc(doc(db, 'events', id));
  };

  const saveProfile = async (id, payload) => {
    /* return await updateDoc(doc(db, 'profiles', id), {
      ...payload
    }); */

    const store = new UserStorage(id);
    const profile = await store.getProfile();
    const data = { ...profile, ...payload };
    console.log('*** saveProfile:', data);
    await store.setProfile(data);
    return data;
  };

  const getProfile = async (id) => {
    /* const docRef = doc(db, 'profiles', id);
    let docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      // initialize user profile
      await setDoc(doc(db, 'profiles', id), {
        schedule: false,
        survey: false,
        events: [],
      });
      // read it again
      docSnap = await getDoc(docRef);
    }
    return  docSnap.data(); */

    const store = new UserStorage(id);
    const data = await store.getProfile();
    console.log('*** getProfile:', data)
    return data;
  };

  const clearProfile = async (id) => {
    const store = new UserStorage(id);
    await store.clearData();
  };

  const getEventsBySchedule = (schedule) => {
    const events = chronotypeToEventsMap[schedule]
    .map(event => ({
      ...event,
      custom:false,
      disable:false,
      id: uuid.v4(),
    }));
    return events;
  };

  const setProfileSchedule = async (id, schedule = 'dolphin', custom=[]) => {
    const events = [...getEventsBySchedule(schedule), ...custom];
    return await saveProfile(id, { schedule, events });
  };

  const setProfileEvents = async (id, events) => {
    return await saveProfile(id, events);
  };

  const setProfileSurvey = async (id, survey) => {
    return await saveProfile(id, survey);
  };

  const setProfileDatedEvents = async (id, dated) => {
    return await saveProfile(id, dated);
  }

  return {
    createScheduleFromTemplate,
    getScheduleQuery,
    getEventsForNotification,
    getEventsByDate,
    createWeekendSchedule,
    removeEventById,
    createEvent,
    updateEvent,
    retrieveEventById,
    saveProfile,
    getProfile,
    clearProfile,
    setProfileSchedule,
    setProfileEvents,
    setProfileSurvey,
    setProfileDatedEvents,
  };
}
