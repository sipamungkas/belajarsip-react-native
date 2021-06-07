import React, {useRef, useState} from 'react';
import {View, FlatList} from 'react-native';
import Header from '../../../components/Header';
import MessageItem from '../../../components/Chats/MessageItem';
import MessageInput from '../../../components/Chats/MessageInput';
import styles from './styles';
import {useRoute} from '@react-navigation/core';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {getRoomChats} from '../../../services/api/chats';
import {errorFormatter} from '../../../utils/Error';
import {snackbarError} from '../../../store/actions/snackbar';
import {useIsFocused} from '@react-navigation/native';

export default function Message() {
  const authReducer = useSelector(state => state.authReducer, shallowEqual);
  const socketReducer = useSelector(state => state.socketReducer, shallowEqual);
  const {socket} = socketReducer;
  const {token, id: userId} = authReducer.user;
  const dispatch = useDispatch();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const {roomId, roomName} = route.params;
  const chatRef = useRef();

  useState(() => {
    getRoomChats(token, roomId)
      .then(res => {
        setIsLoading(true);
        setMessages(prev => {
          return [...prev, ...res.data.data];
        });
      })
      .catch(err => {
        const msg = errorFormatter(err);
        dispatch(snackbarError(msg));
      });
  }, [token, roomId]);
  useState(() => {
    socket.emit('join', `message:${roomId}`);
    socket.on('message', data => {
      console.log(data);
      setMessages(prev => {
        return [data, ...prev];
      });
    });

    return () => {
      socket.off();
    };
  }, []);

  const renderItem = ({item}) => (
    <MessageItem item={item} isSender={item.user_id === userId} />
  );
  return (
    <View style={styles.container}>
      <Header title={roomName} back />
      <View style={[styles.flatListContainer]}>
        <FlatList
          inverted
          ref={chatRef}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.contentContainer}
          data={messages}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.inputContainer}>
        <MessageInput />
      </View>
    </View>
  );
}
