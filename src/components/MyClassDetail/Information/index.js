import React from 'react';
import {View, Dimensions} from 'react-native';
import HTML from 'react-native-render-html';

export default function Information(props) {
  const {course} = props;

  return (
    <View style={{paddingVertical: 10}}>
      <HTML
        source={{html: course?.description || `<h3>No Information</h3>`}}
        contentWidth={Dimensions.get('window').width}
      />
    </View>
  );
}
