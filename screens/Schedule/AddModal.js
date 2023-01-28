import { Modal } from 'react-native';
import { ActivityForm } from '../../components';

export const AddModal = ({ visible, workingDate, ok, close }) => {
  const today = new Date();
  const date = workingDate;
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

  const handleSubmit = (payload) => {
    console.log('*** ',payload)
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
        name='New Activity'
        activity={activity}
        ok={handleSubmit}
        close={close}
      />
    </Modal>
  );
};
