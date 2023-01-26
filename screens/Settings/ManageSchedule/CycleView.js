import { ImageBackground, StyleSheet, Text, View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createTheme } from '../../../themes';

const Theme = createTheme();
const width = Dimensions.get('window').width;

export const CycleView = ({ selected, cycle }) => {
  //console.log([selected, cycle.code]);
  const style = [styles.cycleContainer];
  if (selected === cycle.code) {
    style.push(styles.selected);
    // console.log(style);
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
