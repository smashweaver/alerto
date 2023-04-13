import { StyleSheet, Modal, View, Text, TouchableOpacity } from 'react-native';
import { createTheme } from '../themes';
import { useCallback, useEffect, useState } from 'react';

const Theme = createTheme();

export function OccurrenceDialog({ value, isVisible=false, onChange=()=>{}, onDismiss=()=>{} }) {
  let current = value || {};

  const [mon, setMon] = useState(current.mon || false);
  const [tue, setTue] = useState(current.tue || false);
  const [wed, setWed] = useState(current.wed || false);
  const [thu, setThu] = useState(current.thu || false);
  const [fri, setFri] = useState(current.fri || false);
  const [sat, setSat] = useState(current.sat || false);
  const [sun, setSun] = useState(current.sun|| false);

  const handleConfirm = () => {
    onChange({ mon, tue, wed, thu, fri, sat, sun });
    onDismiss();
  };

  const handleCancel = () => onDismiss();

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      onRequestClose={onDismiss}
    >
      <View style={styles.container}>
        <View style={[styles.content, styles.shadow]}>
          <View style={[styles.header]}>
            <Text style={styles.headerText}>Occurrence</Text>
          </View>

          <View style={styles.body}>
            <View style={[styles.flex]}>
              <DayView caption={'S'} value={sun} color={'red'} onChange={setSun}/>
              <DayView caption={'M'} value={mon} onChange={setMon} />
              <DayView caption={'T'} value={tue} onChange={setTue} />
              <DayView caption={'W'} value={wed} onChange={setWed} />
              <DayView caption={'T'} value={thu} onChange={setThu} />
              <DayView caption={'F'} value={fri} onChange={setFri} />
              <DayView caption={'S'} value={sat} onChange={setSat} />
            </View>
          </View>

          <View style={[styles.buttons]}>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={styles.buttonText}>CANCEL</Text>
            </TouchableOpacity>

            <View style={{padding:5}}></View>

            <TouchableOpacity onPress={handleConfirm}>
              <Text style={styles.buttonText}>CONFIRM</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

function DayView({ caption='M', value=false, color=Theme.ButtonTextColor, onChange=()=>{} }) {
  const borderWidth = value ? StyleSheet.hairlineWidth : 0;
  console.log('*** day view:', { caption, value, borderWidth })

  const styles = StyleSheet.create({
    outer: {
      padding:4,
      borderRadius:50,
      borderColor: Theme.colors.border,
      borderWidth,
    },
    inner: {
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      width:20,
      height:20,
    },
    caption: {
      color,
      fontWeight: '500',
    }
  });

  const handlePress = () => {
    onChange(!value);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.outer}>
        <View style={styles.inner} >
          <Text style={styles.caption}>{caption}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

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
    //alignItems: 'center',
    padding: 20,
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
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});
