import { EventWidget } from './EventWidget';
import { ScrollView } from "react-native";
import { createTheme } from '../../themes';

const Theme = createTheme();

export default function Activities({ isEditable=true, Widget=EventWidget, events=[], onDelete=()=>{}, onEdit=()=>{} }) {
  return (
    <ScrollView
      style={{marginTop:1}}
      keyboardShouldPersistTaps='handled'
    >
      {
        events.map((activity, index) =>
          <Widget
            isEditable={isEditable}
            task={activity}
            remove={onDelete}
            edit={onEdit}
            key={index} />
        )
      }
    </ScrollView>
  )
}
