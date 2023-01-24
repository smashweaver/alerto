import { StyleSheet, View } from 'react-native';
import { DateWidget } from './DateWidget';
import { createTheme } from '../../themes';

export const WeekStrip = ({ days, today, workingDate, setWorkingDate }) => {
  const Theme = createTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingTop: 0,
      paddingBottom: 8,
      backgroundColor: Theme.HeaderBackgroundColor,
    }
  });

  return (
    <View
      style={[styles.container]}
    >
      {
        days.map((date, index) =>
          <DateWidget
            isoDate={date}
            today={today}
            workingDate={workingDate}
            setWorkingDate={setWorkingDate}
            key={index}
          />
        )
      }
    </View>
  );
};
