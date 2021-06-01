import React from 'react';
import {View, FlatList} from 'react-native';
import Header from '../../../components/Header';
import MessageItem from '../../../components/Chats/MessageItem';
import MessageInput from '../../../components/Chats/MessageInput';
import styles from './styles';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useOrientation} from '../../../hooks/useOrientation';

const messages = [
  {id: '1', content: 'lorem', from: '1', to: '2'},
  {id: '2', content: 'lorem', from: '1', to: '2'},
  {id: '3', content: 'lorem', from: '1', to: '2'},
  {id: '4', content: 'lorem', from: '1', to: '2'},
  {id: '8', content: 'lorem', from: '2', to: '2'},
  {id: '5', content: 'lorem', from: '1', to: '2'},
  {id: '6', content: 'lorem', from: '2', to: '2'},
];

export default function Message() {
  const orientation = useOrientation();
  const renderItem = ({item}) => (
    <MessageItem item={item} isSender={item.from === '2'} />
  );
  return (
    <View styles={styles.container}>
      <Header title="Nissa Sabyan" back />
      <View
        style={[
          styles.flatListContainer,
          {
            height:
              orientation === 'PORTRAIT'
                ? heightPercentageToDP(74)
                : heightPercentageToDP(50),
          },
        ]}>
        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={messages}
          renderItem={renderItem}
        />
      </View>
      <View styles={styles.inputContainer}>
        <MessageInput />
      </View>
    </View>
  );
}
