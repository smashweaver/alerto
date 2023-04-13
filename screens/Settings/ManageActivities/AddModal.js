import { Modal } from 'react-native';
import { ActivityForm } from '../../../components';
import uuid from 'react-native-uuid';

export const AddModal = ({  visible, ok, close, }) => {
  const today = new Date();
  const hour = today.getHours();
  const min = today.getMinutes();
  const duration = 60;
  const note = '';
  const title = '';
  const alert = 0;
  const custom = true;
  const disable = false;
  const occurence = {
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: false,
    sun: false,
  };

  const activity = {
    title,
    hour,
    min,
    duration,
    note,
    alert,
    custom,
    occurence,
    disable,
  };

  const handleSubmit = (payload) => {
    payload.id = uuid.v4(),
    ok(payload);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={close}
      style={{ margin: 0}}
    >
      <ActivityForm
        isNew={true}
        showOccurence={true}
        name='Add Activity'
        activity={activity}
        ok={handleSubmit}
        close={close}
      />
    </Modal>
  );
};
