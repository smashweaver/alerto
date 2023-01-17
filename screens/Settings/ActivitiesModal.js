import { Modal, View, Text, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { createTheme } from '../../themes';
import { Activities } from '../../components/Activities';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { EventWidget } from './EventWidget';

const Theme = createTheme();

function ActivitiesModal({ events, visible, close, onDelete=()=>{}, onEdit=()=>{}, onAdd=()=>{} }) {
  const insets = useSafeAreaInsets();

  const marginTop = Platform.OS === 'ios' ? insets.top : 0;
  const marginBottom = Platform.OS === 'ios' ? insets.bottom : 0;

  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={close}
    >
      <View style={[styles.container, { marginTop, marginBottom }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={close}>
            <Feather name="x" size={28} color={Theme.ModalHeaderTextColor}  />
          </TouchableOpacity>

          <Text style={[styles.text, { fontSize:24, marginLeft: 20 }]}>{'Manage Activities'}</Text>

          <TouchableOpacity
            onPress={()=>{}}
            style={{ marginLeft: 'auto'}}
          >
            <Ionicons name="checkmark" size={28} color={Theme.ModalHeaderTextColor} />
          </TouchableOpacity>
        </View>

        <Activities
          Widget={EventWidget}
          events={events}
          onDelete={onDelete}
          onEdit={onEdit}
        />

        <View style={{ padding: 10 }}>
          <TouchableOpacity
            onPress={onAdd}
            style={styles.button}>
            <Text style={styles.buttonText}>New Activity</Text>
          </TouchableOpacity>
        </View>

      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.ContainerBackgroundColor,
  },
  header: {
    backgroundColor: Theme.HeaderBackgroundColor,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    alignContent: 'center',
    display: 'flex',
    paddingBottom: 16
  },
  text: {
    color: '#A6A7AB'
  },
  button: {
    padding: 10,
    backgroundColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    //position: 'absolute',
    //bottom: 10,
    //right: 20,
  },
  buttonText: {
    color: Theme.colors.text,
    //paddingHorizontal: 4
  },
});

export { ActivitiesModal }
