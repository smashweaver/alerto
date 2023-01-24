import React from 'react';
import { View } from 'react-native';
import { EventView } from './EventView';

const EventListView = ({ openModal, coords, list }) => {
  return (
    <View>
    {
      list.map(task => <EventView  openModal={openModal} coords={coords} task={task} key={task.id} />)
    }
  </View>
  );
};

export { EventListView };
