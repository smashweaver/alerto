import React, { useState } from 'react';
import { TouchableOpacity, Text, View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Task = ({ text }) => {
  console.log(text);
  return (
    <View style={[styles.cardContainer, styles.cardShadow]}>
      <Text style={[styles.text]}>
        {text.start}
      </Text>
      <Text style={[styles.text, styles.titleText]}>
        {text.title}
      </Text>
    </View>
  )
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignContext: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
    minHeight: 150,
  },
  tasksContainer: {
    backgroundColor: '#e5dbff',
    paddingTop: 10,
    padding: 20,
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

const EventList = () => {
  const [tasks]= useState([
    {
      start: '12am',
      title: 'Sleep',
    },
    {
      start: '6am',
      title: 'Freshen up',
    },
    {
      start: '7am',
      title: 'Eat',
    },
    {
      start: '9am',
      title: 'Laundry',
    },
    {
      start: '12pm',
      title: 'Lunch',
    },
    {
      start: '1pm',
      title: 'Exercise',
    },
    {
      start: '5pm',
      title: 'Dinner',
    },
    {
      start: '7pm',
      title: 'Free Time',
    },
    {
      start: '8pm',
      title: 'Homework',
    },
    {
      start: '9pm',
      title: 'Meditation',
    },
    {
      start: '10pm',
      title: 'Sleep',
    },
  ]);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1
      }}
      keyboardShouldPersistTaps='handled'
    >
      <View style={styles.tasksContainer}>
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

  );
};

export default function Home() {
  return (
    <SafeAreaView>
      <EventList />
    </SafeAreaView>
  )
}
