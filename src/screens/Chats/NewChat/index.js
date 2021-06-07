import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import HeaderChoose from '../../../components/Chats/HeaderChoose';
import FriendItem from '../../../components/Chats/FriendItem';

import styles from './styles';
import {useNavigation} from '@react-navigation/core';
import {getUsers} from '../../../services/api/chats';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {errorFormatter} from '../../../utils/Error';
import {setIsLoading} from '../../../store/actions/loading';

import {snackbarError} from '../../../store/actions/snackbar';
import {createPrivateMessage} from '../../../services/api/chats';
import {Card, ActivityIndicator} from 'react-native-paper';

export default function ChatList() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [dataLoading, setDataLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [users, setUsers] = useState([]);
  const authReducer = useSelector(state => state.authReducer, shallowEqual);
  const {token, id: userId} = authReducer.user;

  useEffect(() => {
    setDataLoading(true);
    getUsers(token)
      .then(res => {
        const data = res.data.data.filter(user => user.id !== userId);
        setUsers(data);
        setDataLoading(false);
      })
      .catch(err => {
        const msg = errorFormatter(err);
        dispatch(snackbarError(msg));
        setDataLoading(false);
      });
  }, [token, dispatch, userId]);

  const renderItem = ({item}) => (
    <FriendItem
      item={item}
      avatar={item?.avatar}
      name={item.name}
      onPress={() => {
        // console.log(item);
        dispatch(setIsLoading(true));
        createPrivateMessage(token, {members: [item.id]})
          .then(res => {
            dispatch(setIsLoading(false));
            // console.log(res.data, res.status);
            if (res.status === 200 || res.status === 201) {
              navigation.replace('Message', {
                roomId: res.data.data.room_id,
                roomName: item.name,
              });
            }
          })
          .catch(err => {
            dispatch(setIsLoading(false));
            const msg = errorFormatter(err);
            dispatch(snackbarError(msg));
          });
      }}
    />
  );

  return (
    <View style={styles.container}>
      <HeaderChoose search title="Choose friends" />
      <FlatList
        ListEmptyComponent={
          <Card>
            <Card.Content>
              {dataLoading ? (
                <ActivityIndicator animated />
              ) : (
                <Text style={{textAlign: 'center'}}>No User found!</Text>
              )}
            </Card.Content>
          </Card>
        }
        contentContainerStyle={styles.flatList}
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
