import React, { useState } from 'react';
import { Text } from 'react-native';

import Dialog from "react-native-dialog";

export const InputDialog = ({ title, initial, cancel, ok }) => {
  const [value, setValue] = useState(initial) ;

  const handleOk = () => {
    ok(value);
  };

  return (
    <Dialog.Container visible={true}>
      <Dialog.Title>
        <Text style={{color: '#000'}}>{title}</Text>
      </Dialog.Title>

      <Dialog.Input
        style={{fontSize:18, color:'#000'}}
        maxLength={200}
        value={value}
        onChangeText={setValue}
        multiline={true}
        numberOfLines={5}
      />

      <Dialog.Button label="Cancel" onPress={cancel} />
      <Dialog.Button label="Ok" onPress={handleOk} />
    </Dialog.Container>
  )
};
