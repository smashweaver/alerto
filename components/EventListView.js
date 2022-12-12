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
    paddingTop: 10,
    padding: 20,
  },
});

export { EventListView };
