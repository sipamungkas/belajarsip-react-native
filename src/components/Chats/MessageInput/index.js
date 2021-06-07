import React from 'react';
import {TextInput, View, TouchableWithoutFeedback} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

export default function MessageInput(props) {
  console.log(props.isSending);
  return (
    <View style={styles.container}>
      <TextInput
        multiline
        style={styles.input}
        placeholder="Write Message"
        value={props.text}
        onChangeText={text => props.setText(text)}
      />
      <TouchableWithoutFeedback
        onPress={props.sendHandler}
        disabled={props.isSending}>
        <View style={styles.sendButton}>
          <Ionicons
            name={props.isSending ? 'reload-outline' : 'send-outline'}
            color="white"
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
