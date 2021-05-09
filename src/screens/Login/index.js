import React, {useState} from 'react';
import {ScrollView, View, Dimensions, TouchableOpacity} from 'react-native';
import {TextInput, Text, Button, HelperText} from 'react-native-paper';

import {useOrientation} from '../../components/useOrientation';
import {connect} from 'react-redux';
import {loginHandler} from '../../store/actions/auth';

import GoogleIcon from '../../assets/icons/google-icon.svg';
import EyeIcon from '../../assets/icons/eye-icon.svg';
import EyeSlashIcon from '../../assets/icons/eye-slash-icon.svg';
import Color from '../../Color';

import styles from './styles';

function Login(props) {
  const orientation = useOrientation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const emailRules = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/;
  const formMargin =
    orientation === 'PORTRAIT'
      ? (8 / 100) * Dimensions.get('window').height
      : (5 / 100) * Dimensions.get('window').height;

  const usernameHasErrors = () => {
    return username && !emailRules.test(username);
  };

  const passwordHasErrors = () => {
    return password.length < 8 && password;
  };

  const onLoginHandler = () => {
    if (passwordHasErrors() || usernameHasErrors() || !password || !username) {
      return;
    }

    props.onLoginHandler(username, password);
  };

  const {isError, error} = props.authReducer;
  const isLoading = false;

  const helperTextDisplay = passwordHasErrors() ? 'flex' : 'none';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.loginText}>Login</Text>
      <View
        style={{
          ...styles.form,
          marginVertical: formMargin,
        }}>
        {isError && (
          <HelperText type="error" visible={isError} style={styles.apiError}>
            {error?.response?.data?.message ||
              error?.message ||
              'Username and password Can not be empty'}
          </HelperText>
        )}
        <TextInput
          style={[styles.username]}
          label="Usermame or Email"
          value={username}
          onChangeText={text => setUsername(text)}
          mode="outlined"
          theme={{
            colors: {primary: Color.PRIMARY},
            roundness: 10,
          }}
        />
        <HelperText type="error" visible={usernameHasErrors()}>
          Invalid Email address
        </HelperText>
        <TextInput
          secureTextEntry={!showPassword}
          style={styles.password}
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          mode="outlined"
          theme={{
            colors: {primary: Color.PRIMARY},
            roundness: 10,
          }}
          right={
            <TextInput.Icon
              name={!showPassword ? EyeIcon : EyeSlashIcon}
              onPress={() => setShowPassword(!showPassword)}
              forceTextInputFocus={false}
            />
          }
        />
        <HelperText
          type="error"
          visible={passwordHasErrors()}
          style={{display: helperTextDisplay}}>
          {password.length < 8 ? 'Min Password Length is 8' : ''}
        </HelperText>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </View>
      <Button
        mode="contained"
        style={styles.loginBtn}
        uppercase={false}
        theme={{roundness: 10}}
        onPress={() => {
          onLoginHandler(username, password);
        }}
        disabled={isLoading}>
        <Text style={([styles.btnText], {color: 'white'})}>
          {isLoading ? 'Loading....' : 'Login'}
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
      <TouchableOpacity onPress={() => console.log('register')}>
        <Text style={{...styles.newUsertext, marginTop: formMargin}}>
          New User?
          <Text
            onPress={() => props.navigation.navigate('Login')}
            style={styles.registerText}>
            {' '}
            Register
          </Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const mapStateToProps = state => {
  return {
    authReducer: state.authReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoginHandler: (username, password) =>
      dispatch(loginHandler(username, password)),
  };
};

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

export default ConnectedLogin;
