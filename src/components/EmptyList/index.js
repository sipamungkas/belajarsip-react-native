import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';

export default function EmptyList() {
  return (
    <Card>
      <Card.Content>
        <Text style={styles.text}>No Content</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});
