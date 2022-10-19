import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { auth, signInWithEmailAndPassword } from '../contexts/firebase';
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

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

      <TouchableOpacity
        disabled={disabled}
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
    justifyContent: "center",
    paddingHorizontal: '10%',
    backgroundColor: '#e5dbff'
  },
  button: {
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: '#845ef7',
    borderRadius: 4
  },
  text: {
    color: '#fff',
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
