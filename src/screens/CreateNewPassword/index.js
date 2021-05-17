import React, {useState} from 'react';
import {StatusBar, ScrollView, View, TouchableOpacity} from 'react-native';
import {Text, Button, HelperText} from 'react-native-paper';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios';

import {useOrientation} from '../../hooks/useOrientation';

import Color from '../../Color';
import CustomTextInput from '../../components/CustomTextInput';
import CustomModal from '../../components/CustomModal';

import styles from './styles';

function Register(props) {
  const orientation = useOrientation();
  const [isLoading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

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
    // axios
    //   .post(`${API_URL}/v1/auth/register`, {username, email, password})
    //   .then(res => {
    //     setSuccess(res.data);
    //     setLoading(false);
    //   })
    //   .catch(err => {
    //     setSuccess(false);
    //     setLoading(false);
    //     setError(err);
    //   });
  };

  const formValidationErrors = () => {
    if (!password || !confirmPassword) {
      setError({message: 'Please fill out all required fields!'});
      return true;
    }
    if (passwordHasErrors() || confirmPassHassErrors()) {
      setError({});
      return true;
    }
    return false;
  };

  return (
    <>
      <StatusBar
        backgroundColor={Color.DEFAULT_BACKGROUND}
        barStyle="dark-content"
      />
      <View
        style={[styles.header, {height: orientation === 'PORTRAIT' ? 35 : 0}]}
      />
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
        <Text style={styles.title}>Create new password</Text>
        <Text
          style={[
            styles.subtitle,
            {marginTop: orientation === 'PORTRAIT' ? hp(5) : hp(1)},
          ]}>
          Your new password must be different from previous used password!
        </Text>
        <View>
          <HelperText style={styles.errors}>
            {error?.response?.data?.message || error?.message}
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

        <View
          style={[
            styles.btnContainer,
            {marginTop: orientation === 'PORTRAIT' ? hp(20) : hp(3)},
          ]}>
          <Button
            // onPress={sendHandler}
            mode="contained"
            style={styles.loginBtn}
            uppercase={false}
            theme={{roundness: 10}}>
            <Text style={([styles.btnText], {color: 'white'})}>Send</Text>
          </Button>
        </View>
      </ScrollView>
    </>
  );
}

export default Register;
