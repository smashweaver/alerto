import React from 'react';
import { Modal } from 'react-native';
import { ActivityForm } from '../../components/ActivityForm';
import { formatDate } from '../../utils';

export const AddModal = ({ workingDate, ok, close }) => {
  const today = new Date();
  console.log({ today });
  const date = workingDate
  const hour = today.getHours();
  const min = today.getMinutes();
  const duration = 60;
  const note = '';
  const title = '';
  const alert = 0;
  const custom= true;

  const activity = {
    title,
    date,
    hour,
    min,
    duration,
    note,
    alert,
    custom,
  };

  console.log(activity)

  const handleSubmit = (payload) => {
    ok(payload);
  };

  return (
    <Modal
      visible={true}
      transparent={true}
      onRequestClose={close}
      style={{ margin: 0}}
    >
      <ActivityForm
        name='New Activity'
        activity={activity}
        ok={handleSubmit}
        close={close}
      />
    </Modal>
  );
};

export const EditModal = ({ activity, ok, close }) => {
  const handleSubmit = (payload) => {
    ok(activity, payload);
  };

  console.log(activity)

  return (
    <Modal
      visible={true}
      transparent={true}
      onRequestClose={close}
      style={{ margin: 0}}
    >
      <ActivityForm
        name='Edit Activity'
        activity={activity}
        ok={handleSubmit}
        close={close}
      />
    </Modal>
  );
};
