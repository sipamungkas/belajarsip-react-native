import React, {useRef, useState} from 'react';
import {View, FlatList} from 'react-native';
import Header from '../../../components/Header';
import MessageItem from '../../../components/Chats/MessageItem';
import MessageInput from '../../../components/Chats/MessageInput';
import styles from './styles';
import {useRoute} from '@react-navigation/core';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {getRoomChats, sendMessage} from '../../../services/api/chats';
import {errorFormatter} from '../../../utils/Error';
import {snackbarError} from '../../../store/actions/snackbar';

export default function Message() {
  const authReducer = useSelector(state => state.authReducer, shallowEqual);
  const socketReducer = useSelector(state => state.socketReducer, shallowEqual);
  const {socket} = socketReducer;
  const {token, id: userId} = authReducer.user;
  const dispatch = useDispatch();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const {roomId, roomName} = route.params;
  const chatRef = useRef();

  useState(() => {
    setIsLoading(true);
    getRoomChats(token, roomId)
      .then(res => {
        setIsLoading(false);
        if (res.status === 404) {
          setMessages([]);
        } else {
          if (res.data?.data?.info?.total !== 0) {
            setMessages(prev => {
              return [...prev, ...res.data.data];
            });
          }
        }
      })
      .catch(err => {
        const msg = errorFormatter(err);
        dispatch(snackbarError(msg));
        setIsLoading(false);
      });
  }, [token, roomId]);

  useState(() => {
    socket.emit('join', `message:${roomId}`);
    socket.on('message', data => {
      setMessages(prev => {
        return [data, ...prev];
      });
    });

    return () => {
      socket.off();
    };
  }, []);

  const sendHandler = () => {
    if (!text || text.length === 0) {
      dispatch(snackbarError('You can not send empty message!'));
      return;
    }
    const data = {
      room_id: roomId,
      content: text,
    };
    setIsLoading(true);
    sendMessage(token, data)
      .then(res => {
        if (res.status === 201) {
          setText('');
        }
        setIsLoading(false);
      })
      .catch(err => {
        const msg = errorFormatter(err);
        dispatch(snackbarError(msg));
        setIsLoading(false);
      });
  };

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
        <MessageInput
          isSending={isLoading}
          sendHandler={sendHandler}
          text={text}
          setText={setText}
        />
      </View>
    </View>
  );
}
