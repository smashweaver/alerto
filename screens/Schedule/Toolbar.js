import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createTheme } from '../../themes';

const Theme = createTheme();

export const Toolbar = () => {
  return (
    <View style={[styles.header, styles.flex, {justifyContent:'center'}]}>
      <Text style={[styles.text, { fontSize:24 }]}>{'Schedule'}</Text>
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
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text: {
    color: Theme.colors.text,
  },
});
