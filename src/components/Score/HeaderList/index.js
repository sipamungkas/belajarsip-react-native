import React from 'react';
import {View, Text} from 'react-native';
import {Card} from 'react-native-paper';

export default function index() {
  return (
    <Card theme={{roundness: 0}} style={{borderBottomWidth: 1}}>
      <Card.Content style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{flex: 4, textAlign: 'left'}}>Topic</Text>
        <Text style={{flex: 1, textAlign: 'center'}}>Score</Text>
        <View style={{width: 20}} />
      </Card.Content>
    </Card>
  );
}
