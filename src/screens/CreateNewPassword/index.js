import React, {useState} from 'react';
import {
  StatusBar,
  ScrollView,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Text, Button, HelperText} from 'react-native-paper';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {useOrientation} from '../../hooks/useOrientation';
import {newPassword} from '../../services/api/forgot';
import {connect} from 'react-redux';

import Color from '../../Color';
import CustomTextInput from '../../components/CustomTextInput';
import CustomModal from '../../components/CustomModal';

import styles from './styles';

function CreateNewPassword(props) {
  const orientation = useOrientation();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);

  const passwordHasErrors = () => {
    return password.length < 8 && password;
  };

  const confirmPassHassErrors = () => {
    return password !== confirmPassword;
  };

  const sendHandler = () => {
    const {otp, email} = props.forgotReducer;
    setIsLoading(true);
    if (formValidationErrors()) {
      setIsLoading(false);
      return;
    }
    newPassword(email, otp, password)
      .then(res => {
        console.log(res.data);
        setIsLoading(false);
        setSuccess(true);
      })
      .catch(err => {
        console.log(err.message);
        setIsLoading(false);
        if (err?.response?.status === 404) {
          Alert.alert('Not Found', 'Email Not Found!');
          return;
        }
        Alert.alert(
          'Error',
          err?.response?.data?.message ||
            err?.message ||
            'Something went wrong!',
        );
      });
    // setSuccess(true);
    // axios
    //   .post(`${API_URL}/v1/auth/register`, {username, email, password})
    //   .then(res => {
    //     setSuccess(res.data);
    //     setIsLoading(false);
    //   })
    //   .catch(err => {
    //     setSuccess(false);
    //     setIsLoading(false);
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
      <CustomModal
        visible={isLoading}
        type={'loading'}
        message={'Please wait...'}
      />
      <CustomModal
        visible={success || false}
        type={'success'}
        message={'Password Changed!'}
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
      <StatusBar
        backgroundColor={Color.DEFAULT_BACKGROUND}
        barStyle="dark-content"
      />

      <View
        style={[styles.header, {height: orientation === 'PORTRAIT' ? 35 : 0}]}
      />
      <ScrollView contentContainerStyle={styles.container}>
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
            onPress={sendHandler}
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

const mapStateToProps = state => {
  return {
    forgotReducer: state.forgotReducer,
  };
};

const ConnectedCreateNewPassword = connect(mapStateToProps)(CreateNewPassword);
export default ConnectedCreateNewPassword;
