import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { createStyle } from '../styles';
import { AuthContext } from '../contexts/Authentication';

export default function Login() {
  const isFocused = useIsFocused();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [busy, setBusy] = useState(false);
  const [buttonText, setButtonText] = useState(null);
  const { colorScheme, auth } = useContext(AuthContext)
  const styles = createStyle('register', colorScheme);

  const clear = () => {
    setErrorMessage('');
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleRegister = async () => {
    console.log('*** register the user\n');
    setErrorMessage('');
    setDisabled(true);
    setBusy(true);

    try {
      await auth.registerUser(email, password, name);
    } catch(error) {
      setErrorMessage(error.message);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    clear();
    Keyboard.dismiss();
  }, [isFocused]);

  useEffect(() => {
    if (busy) {
      setButtonText(<ActivityIndicator size="small" style={styles.buttonText} />);
    } else {
      setButtonText(<Text style={styles.buttonText}>SUBMIT</Text>)
    }
  }, [busy]);

  useEffect(() => {
    const valid = name.trim() && email.trim() && password.trim();
    setDisabled(!valid);
  }, [name, email, password]);

  return (
    <View edges={[]} style={styles.container}>
      {errorMessage &&
        <View style={styles.error}>
          <Text style={styles.message}>{errorMessage}</Text>
        </View>}

      <Text style={styles.prompt}>Name</Text>
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
        autoCapitalize='none'
      />

      <Text style={styles.prompt}>Email</Text>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        autoCapitalize='none'
        keyboardType='email-address'
      />

      <Text style={styles.prompt}>Password</Text>
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        style={styles.input}
        autoCapitalize='none'
      />

      <TouchableOpacity
        disabled={disabled || busy}
        style={styles.button}
        onPress={handleRegister}
      >
        {buttonText}
      </TouchableOpacity>
    </View>
  );
}
