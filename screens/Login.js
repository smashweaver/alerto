import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { auth, signInWithEmailAndPassword } from '../contexts/firebase';

export default function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, userName, password)
      .then((userCredential) => {
        console.log(JSON.stringify(userCredential, null, 2));
        setErrorMessage('');
        setUserName('');
        setPassword('');
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setUserName('');
        setPassword('');
      })
  };

  useEffect(() => {
    const enableButton = userName.trim() && password.trim();
    setDisabled(!enableButton);
  }, [userName, password]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Login
      </Text>

      {errorMessage &&
        <View style={styles.error}>
          <Text style={styles.message}>{errorMessage}</Text>
        </View>}

      <TextInput
        value={userName}
        onChangeText={(username) => setUserName(username)}
        placeholder={'Username'}
        style={styles.input}
        autoCapitalize='none'
        autoFocus={true}
      />

      <TextInput
        value={password}
        onChangeText={(password) => setPassword(password)}
        placeholder={'Password'}
        secureTextEntry={true}
        style={styles.input}
        autoCapitalize='none'
      />

      <Button
        title={'Login'}
        onPress={handleLogin}
        disabled={disabled}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    // width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
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
