import React from 'react';
import { View, StyleSheet } from 'react-native';
import { EventView } from './EventView';

const EventListView = ({ openModal, setActive, coords, tasks }) => {
  return (
    <View style={styles.listContainer}>
    {
      tasks.map(task => <EventView  openModal={openModal} setActive={setActive} coords={coords} task={task} key={task.id} />)
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
