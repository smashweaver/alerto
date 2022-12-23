import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { registerUser } from '../contexts/firebase';

export default function Login() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [busy, setBusy] = useState(false);
  const [buttonText, setButtonText] = useState(null);

  const clear = () => {
    setErrorMessage('');
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleLogin = () => {
    clear();
    navigation.navigate('Login');
  };

  const handleRegister = async () => {
    console.log('*** register the user\n');
    setErrorMessage('');
    setDisabled(true);
    setBusy(true);
    Keyboard.dismiss();

    try {
      await registerUser(email, password, name);
    } catch(error) {
      setErrorMessage(error.message);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (busy) {
      setButtonText(<ActivityIndicator size="small" color="#ccc" />);
    } else {
      setButtonText(<Text style={styles.text}>REGISTER</Text>)
    }
  }, [busy]);

  useEffect(() => {
    const valid = name.trim() && email.trim() && password.trim();
    setDisabled(!valid);
  }, [name, email, password]);

  return (
    <View style={styles.container}>
      {errorMessage &&
        <View style={styles.error}>
          <Text style={styles.message}>{errorMessage}</Text>
        </View>}

      <Text style={styles.prompt}>Name</Text>
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder={'Name'}
        style={styles.input}
        autoCapitalize='none'
        autoFocus={true}
      />

      <Text style={styles.prompt}>Email</Text>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder={'Email'}
        style={styles.input}
        autoCapitalize='none'
      />

      <Text style={styles.prompt}>Password</Text>
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder={'Password'}
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

      <TouchableOpacity
        disabled={busy}
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.text}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    paddingTop: '10%',
    paddingHorizontal: '10%',
    backgroundColor: '#e5dbff'
  },
  button: {
    alignItems: "center",
    marginTop: 5,
    paddingVertical: 10,
    backgroundColor: '#845ef7',
    borderRadius: 4
  },
  text: {
    color: '#fff',
  },
  prompt: {
    color: '#5F3DC4',
    fontSize: 12,
  },
  input: {
    height: 44,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#5f3dc4',
    marginBottom: 10,
  },
  error: {
    backgroundColor: 'red',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  message: {
    color: '#fff'
  }
});
