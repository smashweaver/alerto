import { Modal, View, Text, Platform, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { createTheme } from '../../themes';
import { Activities } from '../../components/Activities';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { EventWidget } from './EventWidget';
import { Button  } from 'react-native-paper';

const Theme = createTheme();

function ActivitiesModal({
  events,
  close,
  onDelete=()=>{},
  onEdit=()=>{},
  onAdd=()=>{}
}) {
  const insets = useSafeAreaInsets();
  const marginTop = Platform.OS === 'ios' ? insets.top : 0;
  const marginBottom = Platform.OS === 'ios' ? insets.bottom : 0;

  return (
    <View style={styles.container}>
      <View style={[styles.header, styles.flex]}>
        <TouchableOpacity onPress={close}>
          <Ionicons name="arrow-back" size={28} color={Theme.ModalHeaderTextColor} />
        </TouchableOpacity>

        <Text style={[styles.text, { fontSize:24, marginLeft: 20 }]}>{'Manage Activities'}</Text>

        <View>
          <Ionicons name="checkmark" size={28} color={'transparent'} />
        </View>
      </View>

      <Activities
        Widget={EventWidget}
        events={events}
        onDelete={onDelete}
        onEdit={onEdit}
      />

      <View style={{ margin: 10 }}>
        <Button mode='text' textColor={Theme.colors.primary} onPress={onAdd}>
          New Activity
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.ContainerBackgroundColor,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  header: {
    //backgroundColor: Theme.HeaderBackgroundColor,
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
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
