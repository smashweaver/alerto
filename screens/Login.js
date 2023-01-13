import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ActivityIndicator,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { createStyle } from '../styles';
import { AuthContext } from '../contexts/Authentication';
import { createTheme } from '../themes';

export default function Login() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [busy, setBusy] = useState(false);
  const [buttonText, setButtonText] = useState(null);
  const { colorScheme, auth } = useContext(AuthContext)
  const styles = createStyle('login', colorScheme);
  const Theme = createTheme(colorScheme);

  const clear = () => {
    setErrorMessage('');
    setEmail('');
    setPassword('');
  };

  const handleLogin = async () => {
    setErrorMessage('');
    setDisabled(true);
    setBusy(true);

    try {
      await auth.signInUser(email, password);
    } catch(error) {
      setErrorMessage(error.message);
    } finally {
      setBusy(false);
    }
  };

  const handleRegister = () => {
    clear();
    navigation.navigate('Register');
  };

  useEffect(() => {
    clear();
    Keyboard.dismiss();
  }, [isFocused]);

  useEffect(() => {
    if (busy) {
      setButtonText(<ActivityIndicator size="small" color={Theme.ButtonTextColor} />);
    } else {
      setButtonText(<Text style={styles.buttonText}>SUBMIT</Text>)
    }
  }, [busy, colorScheme]);

  useEffect(() => {
    const valid = email.trim() && password.trim();
    setDisabled(!valid);
  }, [email, password]);

  return (
    <View edges={[]} style={styles.container}>
      {errorMessage &&
        <View style={styles.error}>
          <Text style={styles.message}>{errorMessage}</Text>
        </View>}

      <Text style={styles.prompt}>Email</Text>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        autoCapitalize='none'
        autoFocus={true}
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
        onPress={handleLogin}
      >
        {buttonText}
      </TouchableOpacity>

      <TouchableOpacity
        disabled={busy}
        style={styles.button}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>REGISTER</Text>
      </TouchableOpacity>
    </View>
  );
}
