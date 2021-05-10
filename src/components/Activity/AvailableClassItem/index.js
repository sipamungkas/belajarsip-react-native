import React from 'react';
import {View, Text} from 'react-native';
import {Card, Button} from 'react-native-paper';
import Color from '../../../Color';

import styles from './styles';

export default function index(props) {
  const {course} = props;
  return (
    <Card style={styles.card} elevation={2} theme={{roundness: 10}}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text>{course?.name || 'Untitled'}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text>
            {`${course?.price === 0 ? 'Free' : `$${course.price}`}` ||
              'No Price'}
          </Text>
        </View>
        <View style={styles.actionContainer}>
          <Button
            uppercase={false}
            style={styles.btn}
            contentStyle={styles.btnText}
            mode="contained"
            color={Color.PRIMARY}
            theme={{roundness: 20}}>
            <Text style={styles.btnText}>Register</Text>
          </Button>
        </View>
      </View>
    </Card>
  );
}
