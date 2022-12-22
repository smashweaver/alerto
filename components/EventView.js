import React, { useContext, useEffect, useMemo, useState  } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../contexts/Authentication';
import { getAlertColor, getFormattedTime } from '../utils';

const EventView = ({ openModal, coords, task }) => {
  const { hour, setActive } = useContext(AuthContext);
  const color = useMemo(() => getAlertColor(task.alert), [task.alert]);
  const time = useMemo(() => getFormattedTime(task.start), [task.start]);
  const [focusStyle, setFocusStyle] = useState(styles.normal);

  const { title, start } = task;

  /*useEffect(() => {
    console.log({ title, start, id: task.id, hour });
  }, []);*/

  const onPress = () => openModal(task);

  useEffect(() => {
    if (start === hour) {
      console.log('*** event activated:', task.id);
      setFocusStyle(styles.active);
      setTimeout(() => setActive(task.id), 150);
    } else {
      setFocusStyle(styles.normal);
    }
  }, [hour, start]);

  return (
    <View
      key={task.id}
      style={[styles.cardContainer, styles.cardShadow, styles.flexContainer, styles.current, focusStyle]}
      onLayout={event => {
        const layout = event.nativeEvent.layout;
        coords[task.id] = layout.y;
      }}
    >
      <Text style={[styles.text]}>
        {time}
      </Text>

      <Text style={[styles.text, styles.titleText]}>
        {title}
      </Text>

      {color &&
        <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={onPress}>
          <Ionicons name="alert-circle" size={30} color={color} />
        </TouchableOpacity>}
    </View>
  )
};

const styles = StyleSheet.create({
  active: {
    borderColor: '#CC5DE8',
    borderWidth: 2,
  },
  normal: {
  },
  flexContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContext: 'center',
    justifyContent: 'flex-start',
  },
  cardContainer: {
    backgroundColor: '#D0BFFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    minHeight: 150,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
  titleText: {
    marginLeft: 10,
    textDecorationLine: 'underline',
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  }
});

export { EventView };
