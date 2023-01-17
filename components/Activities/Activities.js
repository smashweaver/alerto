import { EventWidget } from './EventWidget';
import { ScrollView } from "react-native";
import { createTheme } from '../../themes';

const Theme = createTheme();

export default function Activities({ Widget=EventWidget, events=[], onDelete=()=>{}, onEdit=()=>{} }) {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: Theme.ContainerBackgroundColor, paddingTop: 10 }}
      keyboardShouldPersistTaps='handled'
    >
      {
        events.map((activity, index) =>
          <Widget
            task={activity}
            remove={onDelete}
            edit={onEdit}
            key={index} />
        )
      }
    </ScrollView>
  )
}
