import { Modal } from 'react-native';
import { ActivityForm } from '../../../components';

export const EditModal = ({ visible, activity, ok, close, onDelete }) => {
  const handleSubmit = (payload) => {
    ok(activity, payload);
  };

  const handleDelete = () => {
    onDelete(activity);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={close}
      style={{ margin: 0}}
    >
      <ActivityForm
        name='Edit Activity'
        activity={activity}
        ok={handleSubmit}
        close={close}
        onDelete={handleDelete}
      />
    </Modal>
  );
};
