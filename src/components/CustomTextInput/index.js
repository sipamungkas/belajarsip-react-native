import React, {useState} from 'react';
import {View} from 'react-native';
import {TextInput, HelperText} from 'react-native-paper';

import EyeIcon from '../../assets/icons/eye-icon.svg';
import EyeSlashIcon from '../../assets/icons/eye-slash-icon.svg';

import styles from './styles.js';

import Color from '../../Color';

export default function CustomTextInput(props) {
  const [show, setShow] = useState(false);
  const {
    type,
    value,
    setValue,
    helpersValidation,
    label,
    helpersMessage,
  } = props;

  switch (type) {
    case 'password':
      return (
        <View>
          <TextInput
            secureTextEntry={!show}
            style={styles.password}
            label={label}
            value={value}
            onChangeText={text => setValue(text)}
            mode="outlined"
            theme={{
              colors: {primary: Color.PRIMARY},
              roundness: 10,
            }}
            right={
              <TextInput.Icon
                name={!show ? EyeIcon : EyeSlashIcon}
                onPress={() => setShow(!show)}
                forceTextInputFocus={false}
              />
            }
          />
          <HelperText
            type="error"
            visible={helpersValidation()}
            //   style={{display: helperTextDisplay}}
          >
            {helpersMessage}
          </HelperText>
        </View>
      );
    case 'email':
      return (
        <View>
          <TextInput
            style={styles.password}
            label={label}
            value={value}
            onChangeText={text => setValue(text)}
            mode="outlined"
            theme={{
              colors: {primary: Color.PRIMARY},
              roundness: 10,
            }}
            right={
              <TextInput.Icon
                name={!show ? EyeIcon : EyeSlashIcon}
                onPress={() => setShow(!show)}
                forceTextInputFocus={false}
              />
            }
          />
          <HelperText
            type="error"
            visible={helpersValidation()}
            //   style={{display: helperTextDisplay}}
          >
            {helpersMessage}
          </HelperText>
        </View>
      );

    default:
      return (
        <View>
          <TextInput
            style={styles.password}
            label={label}
            value={value}
            onChangeText={text => setValue(text)}
            mode="outlined"
            theme={{
              colors: {primary: Color.PRIMARY},
              roundness: 10,
            }}
          />
          <HelperText
            type="error"
            visible={helpersValidation()}
            //   style={{display: helperTextDisplay}}
          >
            {helpersMessage}
          </HelperText>
        </View>
      );
  }
}
