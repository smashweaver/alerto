import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createTheme } from '../../themes';

const Theme = createTheme();

export const Toolbar = () => {
  const handleSubmit = () => {};

  return (
    <View style={[styles.header, styles.flex, {justifyContent:'center'}]}>
      <Text style={[styles.text, { fontSize:24 }]}>{'Survey'}</Text>

      <TouchableOpacity onPress={handleSubmit}>
        <MaterialCommunityIcons name="restart" size={0} color={Theme.ModalHeaderTextColor}  />
      </TouchableOpacity>
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
