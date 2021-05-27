import React, {useState} from 'react';
import {ScrollView, View, Dimensions, TouchableOpacity} from 'react-native';
import {TextInput, Text, Button, HelperText} from 'react-native-paper';
import axios from 'axios';

import {API_URL} from '@env';
import {useOrientation} from '../../hooks/useOrientation';

import GoogleIcon from '../../assets/icons/google-icon.svg';

import Color from '../../Color';
import CustomTextInput from '../../components/CustomTextInput';
import CustomModal from '../../components/CustomModal';

import styles from './styles';

function Register(props) {
  const orientation = useOrientation();
  const [isLoading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

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
    setLoading(true);
    if (formValidationErrors()) {
      setLoading(false);
      return;
    }
    // setSuccess(true);
    axios
      .post(`${API_URL}/v1/auth/register`, {username, email, password})
      .then(res => {
        setSuccess(res.data);
        setLoading(false);
      })
      .catch(err => {
        setSuccess(false);
        setLoading(false);
        setError(err);
      });
  };

  const setUserNameValidator = text =>
    setUsername(
      text.replace(/[`~0-9!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ \t]/gi, ''),
    );

  const formValidationErrors = () => {
    if (!username || !email || !password || !confirmPassword) {
      setError({message: 'Please fill out all required fields!'});
      return true;
    }
    if (
      usernameHasErrors() ||
      emailHasErrors() ||
      passwordHasErrors() ||
      confirmPassHassErrors()
    ) {
      setError({});
      return true;
    }
    return false;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomModal
        visible={isLoading}
        type={'loading'}
        message={'Please wait...'}
      />
      <CustomModal
        visible={success?.success || false}
        type={'success'}
        message={success?.message || 'Account Created'}
        callbackComponent={
          <TouchableOpacity
            onPress={() => {
              setSuccess(false);
              props.navigation.navigate('Login');
            }}>
            <Text style={styles.callbackComponent}>Login Your Account</Text>
          </TouchableOpacity>
        }
      />
      <Text style={styles.loginText}>Register</Text>
      <View
        style={{
          ...styles.form,
          marginVertical: formMargin,
        }}>
        <HelperText style={styles.errors}>
          {error?.response?.data?.message || error?.message}
        </HelperText>
        <CustomTextInput
          label="Username"
          type="text"
          helpersValidation={usernameHasErrors}
          helpersMessage={'Username must be more than 3 characters'}
          value={username}
          setValue={setUserNameValidator}
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
      </View>
      <Button
        mode="contained"
        style={styles.loginBtn}
        uppercase={false}
        theme={{roundness: 10}}
        onPress={onRegisterHandler}
        // disabled={formValidationErrors() ? true : false}
      >
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
        <Text style={styles.btnText}>Register with google</Text>
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
      {/* <Portal>
        <Modal visible={isLoading} dismissable={false} style={styles.modal}>
          <ActivityIndicator
            animating={isLoading}
            size={'large'}
            color={Color.PRIMARY}
          />
        </Modal>
      </Portal> */}
    </ScrollView>
  );
}

export default Register;
