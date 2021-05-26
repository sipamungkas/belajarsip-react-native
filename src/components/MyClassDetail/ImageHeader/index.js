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
import DefaultCategory from '../../../assets/images/default-category-icon.png';

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
                source={
                  course?.category_icon
                    ? {
                        uri: `${API_URL}/images/${course.category_icon}`,
                      }
                    : DefaultCategory
                }
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
