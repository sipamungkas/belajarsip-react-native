import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import {Card} from 'react-native-paper';
import styles from './styles';

export default function index(props) {
  return (
    <View style={{flexDirection: 'row'}}>
      <Card style={styles.timeContainer}>
        <Text style={styles.time}>{'00.00 - 00.00'}</Text>
      </Card>
      <View style={{flex: 3, flexDirection: 'column'}}>
        {props.data.map((item, index) => (
          <Card
            key={item.id}
            elevation={2}
            style={{marginVertical: 3}}
            theme={{roundness: 10}}>
            <TouchableOpacity style={styles.item}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{item.title || 'untitled'}</Text>
              </View>
              <View>
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
    </View>
  );
}
