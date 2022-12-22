import React from 'react';
import { View, StyleSheet } from 'react-native';
import { EventView } from './EventView';

const EventListView = ({ openModal, coords, list }) => {
  return (
    <View style={styles.listContainer}>
    {
      list.map(task => <EventView  openModal={openModal} coords={coords} task={task} key={task.id} />)
    }
  </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export { EventListView };