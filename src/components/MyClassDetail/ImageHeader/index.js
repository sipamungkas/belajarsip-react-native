import React from 'react';
import {
  Animated,
  View,
  Image,
  ImageBackground,
  Text,
  useWindowDimensions,
} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {useOrientation} from '../../../hooks/useOrientation';

import styles from './styles';

export default function ImageHeader(props) {
  const {course} = props;
  const {height: windowHeight} = useWindowDimensions();
  const orientation = useOrientation();

  return (
    <View>
      <View style={styles.cover}>
        <ImageBackground
          resizeMode="cover"
          resizeMethod="resize"
          style={[
            styles.imageBackground,
            {height: orientation === 'PORTRAIT' ? hp(25) : windowHeight * 0.5},
          ]}
          source={{
            uri:
              course?.image ||
              'data:image/jpeg;base64,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',
          }}>
          <View style={styles.imageOverlay} />
          <View style={styles.information}>
            <View style={styles.categoryBackground}>
              <Image
                resizeMode="cover"
                style={styles.categoryIcon}
                source={{
                  uri:
                    'data:image/png;base64,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',
                }}
              />
            </View>
            <View style={{backgroundColor: 'red', width: '68%'}}>
              <Text numberOfLines={1} style={styles.title}>
                {course?.name || 'Untitled'}
              </Text>
              <View
                style={[
                  styles.informationText,
                  {
                    width:
                      orientation === 'PORTRAIT'
                        ? wp(100) - 20 - 100 - 30
                        : '100%',
                  },
                ]}>
                <Text style={styles.subInformationText}>
                  Level : {course?.level || '-'}
                </Text>
                <Text style={styles.subInformationText}>
                  Category : {course?.category || '-'}
                </Text>
                <Text style={styles.subInformationText}>
                  Price : {course?.price ? ` $${course?.price || 0}` : ' Free'}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}
