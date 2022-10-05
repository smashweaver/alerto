import React, { useState } from 'react';
import { TouchableOpacity, Text, View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Task = ({ text }) => {
  console.log(text);
  return (
    <View
      style={{
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        minHeight: 150
      }}
    >
      <Text>{text.title}</Text>
    </View>
  )
}

const EventList = () => {
  const [tasks]= useState([
    {
      start: '12 am',
      title: 'Sleep',
    },
    {
      start: '6 am',
      title: 'Freshen up',
    },
    {
      start: '7 am',
      title: 'Eat',
    },
    {
      start: '9 am',
      title: 'Laundry',
    },
    {
      start: '12 pm',
      title: 'Lunch',
    },
    {
      start: '1 pm',
      title: 'Exercise',
    },
    {
      start: '5 pm',
      title: 'Dinner',
    },
    {
      start: '7 pm',
      title: 'Free Time',
    },
    {
      start: '8 pm',
      title: 'Homework',
    },
    {
      start: '9 pm',
      title: 'My Birthday Party',
      summary: 'Meditation',
    },
    {
      start: '10 pm',
      title: 'Sleep',
    },
  ]);

  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.items}>
        {
          tasks.map((item, index) => {
            return (
              <TouchableOpacity key={index} >
                <Task text={item} />
              </TouchableOpacity>
            )
          })
        }
      </View>
      </ScrollView>
    </View>
  );
};

export default function Home() {
  return (
    <SafeAreaView>
      <EventList />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  items: {
    backgroundColor: '#e5dbff',
    paddingTop: 10,
    padding: 20
  }
});
