import {
  Dimensions,
  View,
  StyleSheet,
  Text
} from 'react-native';
import { createTheme } from '../../themes';
import { questionToAnswersMap } from '../../constants';
import AnswerView from './AnswerView';

const Theme = createTheme();
const width = Dimensions.get('window').width;

export default function QuestionView({ question, page, onAnswer, result }) {
  const answers = questionToAnswersMap.get(question);
  return (
    <View style={{width}}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={[styles.page]}>Question #{page+1}</Text>
          <Text style={[styles.question]}>{question}</Text>

          <View style={styles.answers}>
            {
              answers.map((answer, index) => <AnswerView result={result} question={question} answer={answer} onAnswer={onAnswer} key={index}/>)
            }
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  card: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: Theme.CardBackgroundColor,
  },
  page: {
    color: Theme.colors.text,
    fontSize: 12,
    fontStyle: 'italic',
  },
  question: {
    color: Theme.colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  answers: {
    marginTop: 20,
  }
});
