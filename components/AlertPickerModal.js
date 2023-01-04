import React from 'react';
import { StyleSheet, Modal, View, Text, TouchableOpacity } from 'react-native';
import { createTheme } from '../themes';
import { FontAwesome } from '@expo/vector-icons';

const AlertPickerModal = ({ initial = 0, onChange, close}) => {
  const Theme = createTheme();

  const handlePress = (level) => {
    console.log('*** alert:', level);
    onChange(level);
  };

  return (
    <Modal
      visible={true}
      transparent={true}
      onRequestClose={close}
    >
      <View style={styles.container}>
        <View style={[styles.content, styles.shadow]}>
          <View style={[styles.header, styles.centered]}>
            <Text style={{color:'#000', fontSize:20, fontWeight: '700'}}>Alert Level</Text>
          </View>

          <View style={styles.body}>
            <View style={[styles.buttons, styles.centered]}>
              <TouchableOpacity onPress={() => handlePress(0)}>
                <FontAwesome name="bell-o" size={40} color='gray' />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePress(1)}>
                <FontAwesome name="bell-o" size={40} color='green' />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePress(2)}>
                <FontAwesome name="bell-o" size={40} color='#FCC419' />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePress(3)}>
                <FontAwesome name="bell-o" size={40} color='red' />
              </TouchableOpacity>

            </View>
          </View>

          <View style={[styles.actionButtons, styles.centered]}>
              <TouchableOpacity onPress={close}>
                <Text style={{fontSize:20, color: Theme.colors.primary}}>Cancel</Text>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 25,
  },
  content: {
    backgroundColor: '#F8F9FA',
    width: '80%',
    borderRadius: 4,
  },
  centered: {
    display: 'flex',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  body: {
    flexGrow: 1,
    backgroundColor: '#F8F9FA',
    paddingVertical: 20
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  actionButtons: {
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth
  }
});

export { AlertPickerModal };
