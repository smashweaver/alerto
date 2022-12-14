import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { EventView } from './EventView';

const EventListView = ({ scrollTo, setScrollRef, setActive, coords, tasks }) => {
  return (
    <ScrollView
      ref={ref => {
        setScrollRef(ref);
      }}
      contentContainerStyle={{
        flexGrow: 1
      }}
      keyboardShouldPersistTaps='handled'
    >
      <View style={styles.listContainer}>
        {
          tasks.map(task => <EventView  scrollTo={scrollTo} setActive={setActive} coords={coords} task={task} key={task.id} />)
        }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export { EventListView };
