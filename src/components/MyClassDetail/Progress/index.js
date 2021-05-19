import React from 'react';
import {View, Text} from 'react-native';

import ProgressItem from '../ProgressItem';

const data = [
  {name: 'HTML Essential Training', score: 100},
  {name: 'HTML Essential Training', score: 45},
  {name: 'HTML Essential Training', score: 78},
  {name: 'HTML Essential Training HTML Essential Training', score: null},
];

export default function Progress(props) {
  return (
    <View>
      {data.map((item, index) => (
        <ProgressItem key={index} course={item} />
      ))}
    </View>
  );
}
