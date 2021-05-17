import React, {useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StatusBar,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import {useOrientation} from '../../hooks/useOrientation';
import {setOTP} from '../../store/actions/forgot';

import Color from '../../Color';
import Illustration from '../../assets/images/illustrations/people-with-lamp.svg';

import styles from './styles';

function OTPVerification(props) {
  const orientation = useOrientation();
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();

  const nextInput = (text, ref) => {
    if (text.length === 1) {
      ref.current.focus();
    }
  };

  const sendHandler = () => {
    const otp = `${input1 || ''}${input2 || ''}${input3 || ''}${input4 || ''}`;
    if (otp.length < 4) {
      ToastAndroid.show('Please fill all field!', ToastAndroid.SHORT);
      return;
    }
    props.navigation.navigate('CreateNewPassword');
    // call api and next
  };
  console.log(props.forgotReducer);
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
        <Text style={styles.title}>Reset password</Text>
        <Illustration style={styles.illustration} />
        <Text style={styles.h2}>
          Enter verification code we just sent to your email address
        </Text>

        <View style={styles.otpContainer}>
          <TextInput
            onFocus={() => setInput1('')}
            value={input1}
            returnKeyType="next"
            clearTextOnFocus={true}
            keyboardType="phone-pad"
            ref={inputRef1}
            style={styles.otp}
            underlineColor="black"
            maxLength={1}
            theme={{
              colors: {
                primary: Color.PRIMARY,
                accent: '#f1c40f',
              },
            }}
            onChangeText={text => {
              setInput1(text);
              nextInput(text, inputRef2);
            }}
          />
          <TextInput
            onFocus={() => setInput2('')}
            value={input2}
            returnKeyType="next"
            clearTextOnFocus={true}
            keyboardType="phone-pad"
            ref={inputRef2}
            style={styles.otp}
            underlineColor="black"
            maxLength={1}
            theme={{
              colors: {
                primary: Color.PRIMARY,
                accent: '#f1c40f',
              },
            }}
            onChangeText={text => {
              setInput2(text);
              nextInput(text, inputRef3);
            }}
          />
          <TextInput
            onFocus={() => setInput3('')}
            value={input3}
            returnKeyType="next"
            clearTextOnFocus={true}
            keyboardType="phone-pad"
            ref={inputRef3}
            style={styles.otp}
            underlineColor="black"
            maxLength={1}
            theme={{
              colors: {
                primary: Color.PRIMARY,
                accent: '#f1c40f',
              },
            }}
            onChangeText={text => {
              setInput3(text);
              nextInput(text, inputRef4);
            }}
          />
          <TextInput
            onFocus={() => setInput4('')}
            value={input4}
            returnKeyType="done"
            clearTextOnFocus={true}
            keyboardType="phone-pad"
            ref={inputRef4}
            style={styles.otp}
            underlineColor="black"
            maxLength={1}
            onChangeText={text => {
              setInput4(text);
            }}
            theme={{
              colors: {
                primary: Color.PRIMARY,
                accent: '#f1c40f',
              },
            }}
          />
        </View>
        <View style={styles.resendContainer}>
          <Text style={styles.resend}>Didn’t receive a code?</Text>
          <TouchableOpacity>
            <Text style={styles.resendLink}>Resend</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnContainer}>
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

const mapDispatchToProps = dispatch => {
  return {
    setOTP: otp => dispatch(setOTP(otp)),
  };
};

const ConnectedOTPVerification = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OTPVerification);

export default ConnectedOTPVerification;
