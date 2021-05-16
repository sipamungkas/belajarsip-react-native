import React, {useState} from 'react';
import {View, ScrollView, Text, StatusBar} from 'react-native';
import {HelperText, Button, TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Color from '../../Color';
import Illustration from '../../assets/images/illustrations/people-with-questions.svg';

import styles from './styles';

export default function SendOTP(props) {
  const [email, setEmail] = useState('');
  const emailRules = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/;

  const usernameHasErrors = () => {
    return email && !emailRules.test(email);
  };

  return (
    <>
      <StatusBar
        backgroundColor={Color.DEFAULT_BACKGROUND}
        barStyle="dark-content"
      />
      <View style={styles.header}>
        <Ionicons
          name="chevron-back"
          size={32}
          onPress={() => props.navigation.goBack()}
        />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Reset password</Text>
        <Illustration style={styles.illustration} />
        <Text style={styles.h2}>
          Enter your email address linked to this account.
        </Text>
        <Text style={styles.h3}>
          We will send you the verification code to reset your password
        </Text>
        <View style={styles.emailContainer}>
          <TextInput
            style={styles.email}
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            mode="outlined"
            theme={{
              colors: {primary: Color.PRIMARY},
              roundness: 10,
            }}
          />
          <HelperText type="error" visible={usernameHasErrors()}>
            Invalid Email address
          </HelperText>
        </View>
        <View style={styles.btnContainer}>
          <Button
            onPress={() => props.navigation.navigate('OTPVerification')}
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
