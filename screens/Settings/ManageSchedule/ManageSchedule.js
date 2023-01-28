import { useContext, useState } from 'react';
import { TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { createTheme } from '../../../themes';
import { AppContext } from '../../../contexts/appContext';
import { CycleView } from './CycleView';
import { phasic } from '../../../constants';
import { ActivityModal } from '../../../components';

const Theme = createTheme();
const width = Dimensions.get('window').width;

export default function ManageSchedule() {
  const {
    user,
    profile,
    api: {
      updateProfileSchedule,
    },
  } = useContext(AppContext)

  const [scrolledTo, setScrolledTo] = useState(0);
  const [isProcessing, setProcessing] = useState(false);

  const navigation = useNavigation();

  const handleScroll = (ev) => {
    console.log(ev.nativeEvent.contentOffset.x, width);
    setScrolledTo(ev.nativeEvent.contentOffset.x / width);
  };

  const handleApply = async () => {
    const {code} = phasic[scrolledTo];
    console.log('*** profile schedule changed:', code);
    setProcessing(true);
    await updateProfileSchedule(user.uid, code);
    setProcessing(false);
    goBack();
  };

  const goBack = () => {
    navigation.navigate('SettingIndex');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, styles.flex, {justifyContent:'space-between'}]}>
        <TouchableOpacity onPress={goBack}>
          <Ionicons name="arrow-back" size={28} color={Theme.colors.text} />
        </TouchableOpacity>

        <Text style={[styles.text, { fontSize:24, marginLeft: 20 }]}>{'Manage Schedule'}</Text>

        <View>
          <Ionicons name="checkmark" size={28} color={'transparent'} />
        </View>
      </View>

      <ScrollView
        keyboardShouldPersistTaps='handled'
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
      >
        {
          phasic.map(cycle => <CycleView selected={profile.schedule} cycle={cycle} key={cycle.code} />)
        }
      </ScrollView>

      <View>
        <Button textColor={Theme.colors.primary} onPress={handleApply}>
          Apply
        </Button>
      </View>

      <ActivityModal visible={isProcessing} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  header: {
    backgroundColor: Theme.HeaderBackgroundColor,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  text: {
    color: Theme.colors.text,
  },
});
