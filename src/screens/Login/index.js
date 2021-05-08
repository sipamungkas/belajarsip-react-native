import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';

import {TextInput, Text, Button} from 'react-native-paper';

import GoogleIcon from '../../assets/icons/google-icon.svg';
import EyeIcon from '../../assets/icons/eye-icon.svg';
import EyeSlashIcon from '../../assets/icons/eye-slash-icon.svg';
import Color from '../../Color';

import styles from './styles';

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.loginText}>Login</Text>
      <View style={styles.form}>
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
        <TextInput
          secureTextEntry={!showPassword}
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
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </View>
      <Button
        mode="contained"
        style={styles.loginBtn}
        uppercase={false}
        theme={{roundness: 10}}>
        <Text style={([styles.btnText], {color: 'white'})}>Login</Text>
      </Button>

      <Button
        mode="contained"
        icon={GoogleIcon}
        style={styles.googleBtn}
        uppercase={false}
        theme={{roundness: 10}}>
        <Text style={styles.btnText}>Login with google</Text>
      </Button>
    </ScrollView>
  );
}

export default Login;
