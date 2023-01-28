import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { createTheme } from '../../themes';
import { useRecommender } from '../../hooks';
import { ActivityModal } from '../../components';
import { useState } from 'react';

const Theme = createTheme();

function SurveyAnswerView({ question, answer }) {
  return (
    <View style={styles.answerContainer}>
      <Text style={styles.question}>Q: {question}</Text>
      <Text style={styles.answer}>A: {answer}</Text>
    </View>
  )
}

function RecommendationView({ recommendations }) {
  const bestFit = recommendations.join(', ');
  // console.log(recommendations);

  let text = 'Based on the survey results, the following cycle is recommended for you:';
  if (recommendations.length > 1) {
    text = 'Based on the survey results, the following cycles are recommended for you:';
  }

  return (
    <View style={[styles.headerContainer, {marginBottom:20}]}>
      <Text style={styles.header}>Synopis</Text>
      <Text style={styles.recommended}>{text}</Text>
      <Text style={[styles.recommended, {color:'#fff', fontWeight:'500'}]}>- {bestFit}</Text>
    </View>
  )
}

export default function SurveyResultView({ questions, result }) {
  const [recommendations, isProcessing, process] = useRecommender();

  useState(() => {
    process(result);
  }, [])

  return (
    <View style={{flex:1}}>
        <View style={styles.listContainer}>
        <View style={{paddingHorizontal:10}}>
          <ScrollView
            keyboardShouldPersistTaps='handled'
            showsHorizontalScrollIndicator={false}
            horizontal={false}
          >
            <View style={styles.headerContainer}>
              <Text style={styles.header}>Result</Text>
            </View>

            {
              questions.map((question, index) => <SurveyAnswerView question={question} answer={result[question]} key={index}/>)
            }

            <RecommendationView recommendations={recommendations} />
          </ScrollView>
        </View>
      </View>

      <ActivityModal visible={isProcessing} />
    </View>
  )
}

const styles = StyleSheet.create({
  answerContainer: {
    marginBottom: 4,
    padding: 0,
  },
  header: {
    color: '#fff',
    fontSize: 18,
    paddingVertical: 4,
  },
  question: {
    color: '#C1C2C5',
    fontSize: 14,
  },
  answer: {
    color: '#fff',
    marginBottom: 4
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  headerContainer: {
    backgroundColor: Theme.CardBackgroundColor,
  },
  listContainer: {
    //backgroundColor: Theme.CardBackgroundColor,
    padding: 0,
    flexGrow:1
  },
  recommended: {
    color: Theme.colors.text,
  }
});