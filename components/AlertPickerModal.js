import React from 'react';
import { StyleSheet, Modal, View, Text, TouchableOpacity } from 'react-native';
import { createTheme } from '../themes';
import { FontAwesome } from '@expo/vector-icons';

const Theme = createTheme();

const AlertPickerModal = ({ initial = 0, isVisible=false, onChange, close }) => {
  const handlePress = (level) => {
    //console.log('*** alert:', level);
    onChange(level);
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      onRequestClose={close}
    >
      <View style={styles.container}>
        <View style={[styles.content, styles.shadow]}>
          <View style={[styles.header]}>
            <Text style={styles.headerText}>Alert</Text>
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

          <View style={[styles.buttons]}>
              <TouchableOpacity onPress={close}>
                <Text style={styles.buttonText}>CANCEL</Text>
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
    justifyContent: 'space-around',
  },
  header: {
    padding: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '500',
  },
  body: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Theme.colors.border,
    height: 120,
    display: 'flex',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    color:Theme.colors.primary,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
  }
});

export { AlertPickerModal };
