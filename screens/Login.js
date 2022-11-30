import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { auth, signInWithEmailAndPassword } from '../contexts/firebase';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [busy, setBusy] = useState(false);
  const [buttonText, setButtonText] = useState(null);

  const handleLogin = () => {
    setErrorMessage('');
    setDisabled(true);
    setBusy(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(JSON.stringify(userCredential, null, 2));
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage(error.message);
      })
      .finally(() => {
        setBusy(false);
        setEmail('');
        setPassword('');
      });
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  useEffect(() => {
    if (busy) {
      setButtonText(<ActivityIndicator size="small" color="#ccc" />);
    } else {
      setButtonText(<Text style={styles.text}>LOGIN</Text>)
    }
  }, [busy]);

  useEffect(() => {
    const valid = email.trim() && password.trim();
    setDisabled(!valid);
  }, [email, password]);

  return (
    <View style={styles.container}>
      {errorMessage &&
        <View style={styles.error}>
          <Text style={styles.message}>{errorMessage}</Text>
        </View>}

      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder={'Email'}
        style={styles.input}
        autoCapitalize='none'
        autoFocus={true}
      />

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
        onPress={handleLogin}
      >
        {buttonText}
      </TouchableOpacity>

      <TouchableOpacity
        disabled={busy}
        style={styles.button}
        onPress={handleRegister}
      >
        <Text style={styles.text}>REGISTER</Text>
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
    marginTop: 5,
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
