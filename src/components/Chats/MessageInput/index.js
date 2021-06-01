import React from 'react';
import {TextInput, View, TouchableWithoutFeedback} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

export default function MessageInput() {
  return (
    <View style={styles.container}>
      <TextInput multiline style={styles.input} placeholder="Write Message" />
      <TouchableWithoutFeedback>
        <View style={styles.sendButton}>
          <Ionicons name="send-outline" color="white" />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
