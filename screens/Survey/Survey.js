import { useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Toolbar } from './Toolbar';
import { createTheme } from '../../themes';
import { questions } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import QuestionsListView from './QuestionsListView';
import SurveyResultView from './SurveyViewResult';
import { AppContext } from '../../contexts/appContext';
import { ActivityModal } from '../../components/ActivityModal';

const Theme = createTheme();
const width = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;

function ViewSelector(props) {
  const { isDone } = props;
  return !isDone ? <QuestionsListView {...props} /> : <SurveyResultView {...props} />;
}

// find_dimesions(event.nativeEvent.layout)
export default function Survey ({ route: { params } }) {
  const {
    user,
    api: {
      updateProfileSurvey,
    },
  } = useContext(AppContext);
  const navigation = useNavigation();
  const {retake} = params || { retake:false};
  const [result, setResult] = useState({});
  const [page, setPage] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [isDone, setDone] = useState(false);
  const [scrollRef, setScrollRef] = useState(null);
  const [isProcessing, setProcessing] = useState(false);

  const handleConfirm = async () => {
    setProcessing(true);
    await updateProfileSurvey(user.uid, {
      survey: {
        results: { ...result }
      },
    });
    setTimeout(() => {
      setProcessing(false);
      navigation.navigate('SettingIndex');
    }, 5000);
  };

  const handleAnswer = (question, answer) => {
    const newResult = { ...result };
    newResult[question] = answer;
    setResult({ ...newResult });
    if (page < questions.length-1) {
      setTimeout(handleNext, 700);
    } else {
      setTimeout(() => setDone(true), 700);
    }
  };

  const showSurveyResults = () => {
    const xOffset = width * (questions.length-1);
    scrollRef.scrollTo({ x: xOffset, y: 0, animated: true });
  };

  const handleNext = () => {
    // todo: do not allow if current question is not yet answered
    if (page+1 < questions.length) {
      const xOffset = width * (page+1);
      scrollRef.scrollTo({ x: xOffset, y: 0, animated: true });
      setPage(page+1);
    }
  };

  const handlePrev = () => {
    if (page-1 >= 0) {
      const xOffset = width * (page-1);
      scrollRef.scrollTo({ x: xOffset, y: 0, animated: true });
      setPage(page-1);
    }
  };

  const getAnswer = (thisPage) => {
    if (0 <= thisPage &&  thisPage < questions.length) {
      const q = questions[thisPage];
      return result[q] || null;
    }
    return null;
  };

  const resetSurvey = () => {
    setDone(false);
    setAnswer(null);
    setPage(0);
    setResult({});
  }

  useEffect(() => {
    console.log('*** mounting Survey');
    //resetSurvey();
  }, []);

  useEffect(() => {
    //if (retake) resetSurvey();
  }, [retake]);

  useEffect(() =>  {
    if (!scrollRef) return;
    const a = getAnswer(page);
    setAnswer(a);
    // console.log('*** page changed:', {page, answer: a});
    const xOffset = width * (page);
    scrollRef.scrollTo({ x: xOffset, y: 0, animated: true });
  }, [page, scrollRef]);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Toolbar />
      </View>

      <View style={styles.middleContainer}>
        <ViewSelector
          page={page}
          isDone={isDone}
          result={result}
          questions={questions}
          onAnswer={handleAnswer}
          setScrollRef={setScrollRef}
          showSurveyResults={showSurveyResults}
        />
      </View>

      {!isDone &&
      <View style={styles.bottomContainer}>
        <View style={styles.buttonContainer}>
          <Button disabled={isDone} onPress={handlePrev}>Previous</Button>
          <Button disabled={!answer} onPress={handleNext}>Next</Button>
        </View>
      </View>}

      {isDone &&
      <View style={styles.bottomContainer}>
        <View style={styles.buttonContainer}>
          <Button onPress={handleConfirm}>Confirm</Button>
        </View>
      </View>}

      <ActivityModal visible={isProcessing} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: Theme.CardBackgroundColor,
  },
  topContainer: {
  },
  middleContainer: {
    flexGrow: 1000,
  },
  bottomContainer: {
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Theme.colors.background,
  }
});
