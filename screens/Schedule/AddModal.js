import React, { useState} from 'react';
import { Modal } from 'react-native';
import { ActivityForm } from '../../components/ActivityForm';

export const AddModal = ({ ok, close }) => {
  return (
    <Modal
      visible={true}
      transparent={true}
      onRequestClose={close}
      style={{ margin: 0}}
    >
      <ActivityForm ok={ok} close={close} />
    </Modal>
  );
};
