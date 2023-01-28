import { ActivityIndicator, Modal } from 'react-native-paper';
import { createTheme } from '../themes';

export function ActivityModal({ visible }) {
  const Theme = createTheme();
  return (
    <Modal
      dismissable={false}
      visible={visible}
      transparent={true}
    >
      <ActivityIndicator
        animating={true}
        color={Theme.colors.primary}
      />
    </Modal>
  )
}
