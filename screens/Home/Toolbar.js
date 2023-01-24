import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createTheme } from '../../themes';

const Theme = createTheme();

export const Toolbar = () => {
  return (
    <View style={[styles.header, styles.flex, {justifyContent:'center'}]}>
      <Text style={[styles.text, { fontSize:24 }]}>{'Home'}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
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
    //borderBottomWidth: StyleSheet.hairlineWidth,

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

/*
<TouchableOpacity>
  <Ionicons name="checkmark" size={28} color={Theme.colors.text} />
</TouchableOpacity>
*/
