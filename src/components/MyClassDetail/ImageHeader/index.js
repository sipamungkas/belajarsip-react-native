import React from 'react';
import {
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
import {ProgressBar} from 'react-native-paper';

import {useOrientation} from '../../../hooks/useOrientation';
import {API_URL} from '@env';
import DefaultCover from '../../../assets/images/default-course-cover.png';

import styles from './styles';
import Color from '../../../Color';

export default function ImageHeader(props) {
  const {course} = props;
  const {height: windowHeight} = useWindowDimensions();
  const orientation = useOrientation();
  let progress = 0;
  if (course.progress) {
    progress = course?.progress / 100 || 0;
  }
  if (course?.subcourses_done) {
    progress = course.subcourses_done / course.subcourses_total;
  }

  return (
    <View>
      <View style={styles.cover}>
        <ImageBackground
          defaultSource={DefaultCover}
          resizeMode="cover"
          style={[
            styles.imageBackground,
            {height: orientation === 'PORTRAIT' ? hp(25) : windowHeight * 0.5},
          ]}
          source={
            course.image
              ? {
                  uri: `${API_URL}/images/${course.image}`,
                }
              : DefaultCover
          }>
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
            <View style={{width: '68%'}}>
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
              <ProgressBar
                indeterminate={false}
                progress={progress}
                color={Color.PRIMARY}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}
