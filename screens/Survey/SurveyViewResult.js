import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { createTheme } from '../../themes';
import { cycles, questions, questionToChoicesMap } from '../../constants';

const Theme = createTheme();

function getSchedule(question, answer) {
  return questionToChoicesMap
  .get(question, answer)
  .get(answer);
}

function SurveyAnswerView({ question, answer }) {
  return (
    <View style={styles.answerContainer}>
      <Text style={styles.question}>Q: {question}</Text>
      <Text style={styles.answer}>A: {answer}</Text>
    </View>
  )
}

function RecommendationView({ result }) {
   const schedules = {
    mono: 0,
    bi: 0,
    everyman: 0,
    uberman: 0,
    dymaxion: 0,
  };

  const process = (q) => {
    const a = result[q];
    getSchedule(q, a)
    .forEach(cycle => schedules[cycle]++);
  }

  questions.forEach(q => process(q));
  let recommendedSchedule = [];
  let highestScore = 0;
  for (let cycle in cycles) {
    if (schedules[cycle] > highestScore) {
      recommendedSchedule = [cycle];
      highestScore = schedules[cycle];
    } else if (schedules[cycle] === highestScore) {
      recommendedSchedule.push(cycle);
    }
  }

  console.log(schedules);

  const cycleText = {
    'mono': 'Monophasic',
    'bi': 'Biphasic',
    'everyman': 'Everyman',
    'uberman': 'Uberman',
    'dymaxion': 'Dymaxion',
  };

  const bestFit = recommendedSchedule.map(x => cycleText[x]).join(', ');
  let text = 'Based on your answers above, the following cycle is recommended for you:';

  if (recommendedSchedule.length > 1) {
    text = 'Based on your answers above, the following cycles are recommended for you:';
  }

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>Synopis</Text>
      <Text style={styles.recommended}>{text}</Text>
      <Text style={[styles.recommended, {color:'#fff', fontWeight:'500'}]}>- {bestFit}</Text>
    </View>
  )
}

export default function SurveyResultView({ questions, result }) {
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

            <RecommendationView result={result} />
          </ScrollView>
        </View>
      </View>
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