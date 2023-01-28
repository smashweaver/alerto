import { StyleSheet, View } from 'react-native';
import { DateWidget } from './DateWidget';
import { createTheme } from '../../themes';

export function WeekStrip({ days, today, workingDate, setWorkingDate }) {
  const Theme = createTheme();

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingVertical: 10,
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
}
