import React, {useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableNativeFeedback,
  Animated,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import ImageHeader from '../../components/MyClassDetail/ImageHeader';
import Header from '../../components/Header';
import Information from '../../components/MyClassDetail/Information';

import styles from './styles';
import Color from '../../Color';

export default function MyClassDetail(props) {
  const {courseId, courseName} = props.route.params;
  const [index, setIndex] = React.useState(0);
  const contentRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const opacity = fadeAnim.interpolate({
    inputRange: [0, 500],
    outputRange: [0, 1],
  });

  const menu = ['Information', 'Class Progress', 'Class Discussion'];
  const renderTabContent = () => {
    switch (index) {
      case 1:
        return <Information />;
      case 2:
        return <Text>Calss Discussion</Text>;
      default:
        return <Information />;
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header back title={courseName} {...props} />
      <ScrollView
        ref={contentRef}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {y: fadeAnim}},
            },
          ],
          {
            useNativeDriver: false,
          },
        )}>
        <ImageHeader />
        <View style={styles.menuList}>
          {menu.map((item, activeIndex) => (
            <TouchableNativeFeedback onPress={() => setIndex(activeIndex)}>
              <View
                style={[
                  styles.menuContainer,
                  index === activeIndex ? styles.active : '',
                ]}>
                <Text
                  style={[
                    styles.menuText,
                    index === activeIndex ? styles.activeText : '',
                  ]}>
                  {item}
                </Text>
              </View>
            </TouchableNativeFeedback>
          ))}
        </View>
        <View
          style={{
            backgroundColor: Color.DEFAULT_BACKGROUND,
            paddingHorizontal: 15,
          }}>
          {renderTabContent()}
        </View>
      </ScrollView>
      <Animated.View style={[styles.fab, {opacity: opacity}]}>
        <TouchableNativeFeedback
          onPress={() => contentRef.current.scrollTo({y: 0})}>
          <Ionicons name="chevron-up" color="white" size={20} />
        </TouchableNativeFeedback>
      </Animated.View>
    </View>
  );
}
