import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Swiper from 'react-native-swiper';

import NewsImage from '../../../assets/images/news-image.png';

const styles = StyleSheet.create({
  wrapper: {
    minHeight: 200,
    height: hp('30%'),
    borderRadius: 50,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    borderRadius: 100,
  },

  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textContainer: {
    right: 0,
    left: 0,
    position: 'absolute',
    bottom: 0,
    paddingBottom: 35,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    //   'linear-gradient(0deg, #000000 -15.5%, rgba(0, 0, 0, 0) 100%)',
  },
});

export default function News(props) {
  return (
    <Swiper style={styles.wrapper} showsButtons={false}>
      {props.data.map((item, index) => (
        <View key={item.id} style={styles.slide}>
          <ImageBackground
            source={NewsImage}
            imageStyle={{borderRadius: 12}}
            style={{width: '100%', height: '100%'}}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{item.title || 'Untitled'}</Text>
          </View>
        </View>
      ))}
    </Swiper>
  );
}
