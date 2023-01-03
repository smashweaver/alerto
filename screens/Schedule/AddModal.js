import React, { useState} from 'react';
import { Modal } from 'react-native';
//import { useSafeAreaInsets } from 'react-native-safe-area-context';
//import {Picker} from '@react-native-picker/picker';
//import DateTimePicker from '@react-native-community/datetimepicker';
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
