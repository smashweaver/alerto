import { useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Toolbar } from './Toolbar';
import { createTheme } from '../../themes';
import { questions, processPart1 } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import QuestionsListView from './QuestionsListView';
import SurveyResultView from './SurveyViewResult';
import { AppContext } from '../../contexts/appContext';
import { ActivityModal } from '../../components';
import { useChronotype } from '../../constants';

const Theme = createTheme();
//console.log(Theme.colors.disabled);

const width = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;

function ViewSelector(props) {
  const { isDone } = props;
  return !isDone ? <QuestionsListView {...props} /> : <SurveyResultView {...props}  />;
}

export default function Survey ({ route: { params } }) {
  const {
    user,
    api: {
      updateProfileSurvey,
      updateProfileSchedule,
    },
  } = useContext(AppContext);
  const navigation = useNavigation();
  const [chronotype, , , process] = useChronotype();
  const {retake} = params || { retake:false};
  const [result, setResult] = useState({});
  const [page, setPage] = useState(0);
  const [isDone, setDone] = useState(false);
  const [scrollRef, setScrollRef] = useState(null);
  const [isDolphin, setIsDolphin] = useState(false);
  const [isProcessing, setProcessing] = useState(false);

  //console.log(retake);

  const updateUserSchedule = async () => {
    const code = chronotype.toLowerCase();
    console.log('*** updateUserSchedule', { code });
    await updateProfileSchedule(user.uid, code);
  };

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
    console.log('*** handleAnswer', {question, answer});
    setResult(prevResult => ({
      ...prevResult,
      [question]: answer
    }));
  };

  const showSurveyResults = () => {
    const xOffset = width * (questions.length-1);
    scrollRef.scrollTo({ x: xOffset, y: 0, animated: true });
  };

  const handleNext = () => {
    if (isDolphin && page === 8) {
      setDone(true);
      return;
    }

    if (page+1 < questions.length) {
      setPage(page+1);
    }
  };

  const handlePrev = () => {
    if (page-1 >= 0) {
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
    setPage(0);
    setResult({});
  }

  useEffect(() => {
    if (retake) resetSurvey();
  }, [retake]);

  useEffect(() =>  {
    if (!scrollRef) return;
    console.log('*** page:', page+1);
    const xOffset = width * (page);
    scrollRef.scrollTo({ x: xOffset, y: 0, animated: true });
  }, [page, scrollRef]);

  useEffect(() => {
    console.log('*** survey result:', result);
    if (page < questions.length-1) {
      const answer = getAnswer(page);

      if (!answer) return; // wait for answer

      const [score, flag] = processPart1(result);
      setIsDolphin(flag);

      console.log('*** result of part 1:', { score, flag });

      if (flag && page === 8) {
        setDone(true);
      } else {
        setTimeout(handleNext, 700);
      }
    } else {
      setTimeout(() => setDone(true), 700);
    }
  }, [result]);

  useEffect(() => {
    if (isDone)  process(result);
  }, [isDone]);

  useEffect(() => {
    if (chronotype) {
      updateUserSchedule();
    }
  }, [chronotype]);

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
          chronotype={chronotype}
          onAnswer={handleAnswer}
          setScrollRef={setScrollRef}
          showSurveyResults={showSurveyResults}
        />
      </View>

      {!isDone &&
      <View style={styles.bottomContainer}>
        <View style={styles.buttonContainer}>
          <Button disabled={isDone} onPress={handlePrev}>Previous</Button>
          <Button disabled={!getAnswer(page)} onPress={handleNext}>Next</Button>
        </View>
      </View>}

      {isDone &&
      <View style={styles.bottomContainer}>
        <View style={styles.buttonContainer}>
          <Button onPress={handleConfirm}>Ok</Button>
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
    flexGrow: 1,
  },
  bottomContainer: {
    backgroundColor: Theme.colors.background,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});
