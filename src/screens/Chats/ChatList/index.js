import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import Header from '../../../components/Chats/Header';
import ChatItem from '../../../components/Chats/ChatItem';
import {getChatList} from '../../../services/api/chats';

import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {errorFormatter} from '../../../utils/Error';
import {snackbarError} from '../../../store/actions/snackbar';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/core';
import {setNewMsgNotification} from '../../../store/actions/notification';

export default function ChatList() {
  const [create, setCreate] = useState(false);
  const [chatList, setChatList] = useState([]);
  const dispatch = useDispatch();
  const authReducer = useSelector(state => state.authReducer);
  const {token} = authReducer.user;
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(setNewMsgNotification(false));
  }, [dispatch, isFocused]);

  useEffect(() => {
    getChatList(token)
      .then(res => {
        setChatList(res.data.data);
      })
      .catch(err => {
        const msg = errorFormatter(err);
        dispatch(snackbarError(msg));
      });
  }, [token, dispatch, isFocused]);

  const renderItem = ({item}) => (
    <ChatItem
      item={item}
      name={item.name}
      content={item.content}
      time={item.created_at ? moment(item.created_at).format('H:m A') : null}
    />
  );
  return (
    <View style={styles.container}>
      <Header create={create} setCreate={setCreate} />
      <FlatList
        data={chatList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {create && <View style={styles.overlay} />}
    </View>
  );
}
