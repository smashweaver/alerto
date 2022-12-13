import React from 'react';
import { TouchableOpacity, View, ScrollView, StyleSheet } from 'react-native';
import { TaskView } from '../components/TaskView';

const EventListView = ({ tasks }) => {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1
      }}
      keyboardShouldPersistTaps='handled'
    >
      <View style={styles.listContainer}>
        {
          tasks.map(activity => {
            // console.log('*** activity', activity);
            return (
              <TouchableOpacity key={activity.id} >
                <TaskView task={activity} />
              </TouchableOpacity>
            )
          })
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
