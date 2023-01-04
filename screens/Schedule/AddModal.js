import React from 'react';
import { Modal } from 'react-native';
import { ActivityForm } from '../../components/ActivityForm';

export const AddModal = ({ ok, close }) => {
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
