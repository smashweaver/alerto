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

export default function useApi(db) {
  const getEventsByDate = async (ownerId, date) => {
    const colRef = collection(db, 'events');
    const qryRef = query(colRef, where('owner_id', '==', ownerId),  where('date', '==', date));
    const snap = await getDocs(qryRef);
    if (!snap.empty) {
      const data = snap.docs.map(x => ({ ... x.data(), id: x.id }));
      //console.log('*** getEventsByDate', date, docs);
      return [...data];
    }
    return [];
  };

  const getEventsForNotification = async (ownerId, date, time) => {
    console.log('*** getEventsForNotification', { ownerId, date, time});
    const colRef = collection(db, 'events');
    const qryRef = query(colRef, where('owner_id', '==', ownerId),  where('date', '==', date), where('start', '==', time));
    const snap = await getDocs(qryRef);

    if (!snap.empty) {
      return snap.docs.map(x => {
        return { ...x.data(), id: x.id };
      });
    }
    return [];
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
        events.forEach(async t => {
          const start = t.hour * 60 + t.min;
          // console.log({ ...t, owner_id: ownerId, date, start })
          await addDoc(eventRef, { ...t, owner_id: ownerId, date, start });
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

  /* const retrieveProfile = async (id) => {
    const docRef = doc(db, 'profiles', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  };

  const initProfile = async (id) => {
    console.log('*** init profile: ', id);
    await setDoc(doc(db, 'profiles', id), {
      mode: false
    });
  }; */

  const saveProfile = async (id, payload) => {
    return await updateDoc(doc(db, 'profiles', id), {
      ...payload
    });
  };

  const getProfile = async (id) => {
    const docRef = doc(db, 'profiles', id);
    let docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      // initialize user profile
      await setDoc(doc(db, 'profiles', id), {
        schedule: false,
        events: [],
      });
      // read it again
      docSnap = await getDoc(docRef);
    }
    return  docSnap.data();
  };

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
  };
}
