import React, {useState} from 'react';
import {ScrollView, View, Dimensions, TouchableOpacity} from 'react-native';
import {TextInput, Text, Button, HelperText} from 'react-native-paper';

import {useOrientation} from '../../components/useOrientation';

import GoogleIcon from '../../assets/icons/google-icon.svg';

import Color from '../../Color';
import CustomTextInput from '../../components/CustomTextInput';

import styles from './styles';

function Register(props) {
  const orientation = useOrientation();
  const [isLoading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const emailRules = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/;
  const formMargin =
    orientation === 'PORTRAIT'
      ? (5 / 100) * Dimensions.get('window').height
      : (3 / 100) * Dimensions.get('window').height;

  const usernameHasErrors = () => {
    return username && username.length < 3;
  };

  const emailHasErrors = () => {
    return email && !emailRules.test(email);
  };

  const passwordHasErrors = () => {
    return password.length < 8 && password;
  };

  const confirmPassHassErrors = () => {
    return password !== confirmPassword;
  };

  const onRegisterHandler = () => {
    console.log(username, email, password, confirmPassword);
  };

  const formValidationErrors = () => {
    if (
      username ||
      email ||
      password ||
      confirmPassword ||
      usernameHasErrors() ||
      emailHasErrors() ||
      passwordHasErrors() ||
      confirmPassHassErrors()
    ) {
      return true;
    }
    return false;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.loginText}>Register</Text>
      <View
        style={{
          ...styles.form,
          marginVertical: formMargin,
        }}>
        <CustomTextInput
          label="Username"
          type="text"
          helpersValidation={usernameHasErrors}
          helpersMessage={'Username must be more than 3 characters'}
          value={username}
          setValue={setUsername}
        />
        <TextInput
          style={[styles.username]}
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          mode="outlined"
          theme={{
            colors: {primary: Color.PRIMARY},
            roundness: 10,
          }}
        />
        <HelperText type="error" visible={emailHasErrors()}>
          Invalid Email address
        </HelperText>
        <CustomTextInput
          label="Password"
          type="password"
          helpersValidation={passwordHasErrors}
          helpersMessage={'Password must be more than 8 Characters'}
          value={password}
          setValue={setPassword}
        />
        <CustomTextInput
          label="Confirm Password"
          type="password"
          helpersValidation={confirmPassHassErrors}
          helpersMessage={"Password doesn't match"}
          value={confirmPassword}
          setValue={setConfirmPassword}
        />
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </View>
      <Button
        mode="contained"
        style={styles.loginBtn}
        uppercase={false}
        theme={{roundness: 10}}
        onPress={onRegisterHandler}
        disabled={formValidationErrors() ? true : false}>
        <Text style={([styles.btnText], {color: 'white'})}>
          {isLoading ? 'Loading....' : 'Register'}
        </Text>
      </Button>

      <Button
        mode="contained"
        icon={GoogleIcon}
        style={styles.googleBtn}
        uppercase={false}
        theme={{roundness: 10}}
        disabled={isLoading}
        loading={isLoading}>
        <Text style={styles.btnText}>Login with google</Text>
      </Button>
      <TouchableOpacity>
        <Text style={{...styles.newUsertext, marginTop: formMargin}}>
          Already have an account?{' '}
          <Text
            onPress={() => props.navigation.navigate('Login')}
            style={styles.registerText}>
            Login
          </Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default Register;
