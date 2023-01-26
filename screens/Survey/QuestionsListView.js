import { useEffect, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import QuestionView from './QuestionView';

export default function QuestionsListView(props) {
  const { questions, setScrollRef } = props;

  return (
    <View style={{flex:1}}>
      <ScrollView
          ref={ref => setScrollRef(ref)}
          keyboardShouldPersistTaps='handled'
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
        >
          {
            questions.map((question, index) => <QuestionView question={question} page={index} key={index} {...props} />)
          }
      </ScrollView>
    </View>
  )
}
