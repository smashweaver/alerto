import { useEffect, useState } from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { createTheme } from '../../themes';

const Theme = createTheme();

export default function AnswerView({ question, answer, onAnswer, result }) {
  const [hilite, setHilite] = useState(styles.normal)

  useEffect(() => {
    if (result[question] === answer) {
      setHilite(styles.active);
    } else {
      setHilite(styles.normal)
    }
  }, [result])

  const handlePress = () => {
    onAnswer(question, answer);
  };

  return (
    <TouchableOpacity
      style={[styles.container, styles.shadow, hilite]}
      onPress={handlePress}
    >
      <Text style={styles.text}>{answer}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginBottom: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 4,
    borderColor: Theme.HeaderBackgroundColor,
    backgroundColor: Theme.HeaderBackgroundColor,
  },
  text: {
    color: Theme.colors.text,
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  shadow: {
    shadowColor: Theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  active: {
    borderWidth: 1,
    borderColor: Theme.colors.primary,
  },
  normal: {},
});
