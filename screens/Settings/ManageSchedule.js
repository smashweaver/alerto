import { useContext, useState } from 'react';
import { ImageBackground, TouchableOpacity, StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';
import { createTheme } from '../../themes';
import { AppContext } from '../../contexts/appContext';
import constants from '../../constants';

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

      <View style={{ margin: 10 }}>
        <Button mode='text' textColor={Theme.colors.primary} onPress={handleApply}>
          Apply
        </Button>
      </View>
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
        <ImageBackground source={{ uri: cycle.uri }} style={{resize:'cover', height: 200 }}>
          <LinearGradient
            colors={['rgba(0,0,0,0.01)', '#212529']}
            style={{height : '100%', width : '100%'}}
          />
        </ImageBackground>
        <View style={{padding: 10}}>
          <Text style={[styles.title, {marginTop:10}]}>{cycle.title}</Text>
          <Text style={[styles.description]}>{cycle.description}</Text>
        </View>
      </View>
    </View>
  );
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
  title: {
    fontSize: 20,
    color: Theme.colors.text,
  },
  description: {
    marginTop: 10,
    color: '#ADB5BD',
  },
  cycleContainer: {
    flexGrow: 1,
    backgroundColor: '#212529',
  },
  selected: {
    borderWidth: 1,
    borderColor: Theme.colors.primary,
  }
});
