import { useContext, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createTheme } from '../../themes';
import { Button, Card } from 'react-native-paper';
import constants from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../contexts/appContext';

const { phasic  } = constants;

const Theme = createTheme();
const width = Dimensions.get('window').width;

export default function ManageSchedule() {
  const { user, profile, api: { updateProfileSchedule } } = useContext(AppContext)

  const [scrolledTo, setScrolledTo] = useState(0);

  const navigation = useNavigation();

  const handleScroll = (ev) => {
    console.log(ev.nativeEvent.contentOffset.x, width);
    setScrolledTo(ev.nativeEvent.contentOffset.x / width);
  };

  const handleApply = () => {
    const {code} = phasic[scrolledTo];
    console.log('*** schedule changed:', code, user.uid);
    updateProfileSchedule(user.uid, code);
    handleBack();
  };

  const handleBack = () => {
    navigation.navigate('SettingIndex');
  };

  return (
    <View style={styles.container}>
        <View style={[styles.header, styles.flex, {justifyContent:'space-between'}]}>
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="arrow-back" size={28} color={Theme.ModalHeaderTextColor} />
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

        <Button
          mode='text'
          style={{ margin:10, width: '100%'}}
          textColor={Theme.colors.primary}
          onPress={handleApply}
        >
          Apply
        </Button>
      </View>
  )
}

const CycleView = ({ selected, cycle }) => {
  //console.log([selected, cycle.code]);
  const style = [styles.cycleContainer];
  if (selected === cycle.code) {
    style.push(styles.selected);
    console.log(style);
  }

  return (
    <View style={{width}}>
      <View style={style}>
        <Card.Cover  resizeMode="cover" source={{ uri: cycle.uri }} />
        <Text style={[styles.title, {marginTop:10}]}>{cycle.title}</Text>
        <Text style={[styles.description]}>{cycle.description}</Text>
      </View>
    </View>
  );
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
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  text: {
    color: '#A6A7AB'
  },
  title: {
    fontSize: 20,
    color: Theme.colors.text,
  },
  description: {
    marginTop: 10,
    color: '#ADB5BD',
  },
  fullWidth: {
    //backgroundColor: 'red',
    width
  },
  fillerUp: {
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  cycleContainer: {
    flexGrow:1,
    marginHorizontal: 10,
    padding: 20,
    borderRadius:4,
    backgroundColor: '#212529',
  },
  selected: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Theme.CardBorderColor,
  }
});