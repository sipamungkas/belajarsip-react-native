import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import {Card} from 'react-native-paper';
import styles from './styles';

export default function index(props) {
  return (
    <View>
      {props.data.map((item, index) => (
        <Card
          key={item.id}
          elevation={2}
          style={{marginVertical: 3}}
          theme={{roundness: 10}}>
          <TouchableOpacity style={styles.item}>
            <View style={{flex: 1}}>
              <Text style={styles.time}> {item.time || '00.00 - 00.00'}</Text>
            </View>
            <View style={{...styles.titleContainer, flex: 2}}>
              <Text style={styles.title}>{item.title || 'untitled'}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <ProgressCircle
                percent={item.progress}
                radius={20}
                borderWidth={3}
                color="#3399FF"
                shadowColor="#fff"
                bgColor="#fff">
                <Text style={{fontSize: 14}}>{`${item.progress}%`}</Text>
              </ProgressCircle>
            </View>
          </TouchableOpacity>
        </Card>
      ))}
    </View>
  );
}
