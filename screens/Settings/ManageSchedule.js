import { useWindowDimensions, TouchableOpacity, Platform, StyleSheet, Text, View, ScrollView, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createTheme } from '../../themes';
import { Button } from 'react-native-paper';
import { Card } from 'react-native-paper';

const Theme = createTheme();
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const source = [
  {
    code: 'mono',
    title: 'Monophasic',
    description: 'A monophasic sleep cycle refers to a pattern of sleeping in which an individual gets all of their sleep during one main period of time. This is the most common sleep pattern among adults, with most people sleeping for around 7-9 hours per night. Monophasic sleep is characterized by a single period of sleep, typically lasting around 8 hours, followed by a period of wakefulness during the day. This pattern is considered the "normal" sleep pattern for most adults and is the pattern that is most often recommended for overall health and well-being.',
    advantages:'',
  },
  {
    code: 'bi',
    title: 'Biphasic',
    description: 'A biphasic sleep cycle refers to a pattern of sleeping in which an individual gets two periods of sleep during a 24-hour period. The most common biphasic sleep pattern is the siesta, where an individual takes a nap in the early afternoon for about 30 minutes to 2 hours, in addition to a longer period of sleep at night. This pattern is common in many Mediterranean and Latin American countries.',
  },
  {
    code: 'everyman',
    title: 'Polyphasic - Everyman',
    description: 'The Everyman sleep cycle consists of 3.5 to 4 hours of sleep and three 20-minute naps spread out across the day. This may be suited to those who want to use polyphasic sleep to increase their waking hours.',
    advantages:'',
  },
  {
    code: 'uberman',
    title: 'Polyphasic - Uberman',
    description: 'The Uberman sleep cycle consists of 6 to 8 equidistant naps across the day, each lasting 20 minutes. Because this seems the most restrictive, it is best for those who can follow a rigid polyphasic sleep schedule. Generally, this means the uberman sleep cycle is only ideal for those who don not require to be awake for longer than 3.5 hours. That is because that is all the waking time you get between naps.',
    advantages:'',
  },
  {
    code: 'dymaxion',
    title: 'Polyphasic - Dymaxion',
    description: 'The Dymaxion cycle consists of 4 x 30-minute naps throughout the day (roughly every 6 hours), which results in 2 hours of sleep time in total. This is best suited to those who do not require much sleep, or those with the DEC2 gene, also known as short sleepers. This might also be beneficial for those who can fall asleep quickly once they get to bed.',
    advantages:'',
  },
];

export default function ManageSchedule() {

  const handleScroll = (ev) => {
    console.log(ev.nativeEvent.contentOffset, width);
  };

  return (
    <View style={styles.container}>
        <View style={[styles.header, styles.flex, {justifyContent:'space-between'}]}>
          <TouchableOpacity onPress={()=>{}}>
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
            source.map(cycle => <CycleView cycle={cycle} key={cycle.code} />)
          }
        </ScrollView>

        <Button
          mode='text'
          style={{ margin:10, width: '100%'}}
          textColor={Theme.colors.primary}
          onPress={()=>{}}
        >
          Apply
        </Button>
      </View>
  )
}

const CycleView = ({ cycle }) => {
  return (
    <View style={{width}}>
      <View style={styles.cycleContainer}>
         <Card.Cover  resizeMode="contain" source={{ uri: 'https://picsum.photos/200/300?grayscale' }} />
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
  }
});