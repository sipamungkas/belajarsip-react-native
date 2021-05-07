import React, {useState} from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Text,
  Button,
  Toast,
} from 'native-base';

import GoogleIcon from '../../assets/icons/google-icon.svg';

import styles from './style';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container>
      <Content contentContainerStyle={styles.container} padder>
        <Text style={styles.loginText}>Login</Text>
        <Form style={styles.form}>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input onChangeText={text => setUsername(text)} />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input onChangeText={text => setPassword(text)} />
          </Item>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </Form>
        <Button
          full
          rounded
          style={styles.loginBtn}
          onPress={() => {
            Toast.show({
              text: `${password} ${username}`,
              buttonText: 'OK',
            });
          }}>
          <Text>Login</Text>
        </Button>
        <Button iconLeft full rounded light style={styles.googlebtn}>
          <GoogleIcon />
          <Text>Login with google</Text>
        </Button>
      </Content>
    </Container>
  );
}

export default Login;
