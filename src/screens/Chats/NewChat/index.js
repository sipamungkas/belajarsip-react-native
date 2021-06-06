import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import HeaderChoose from '../../../components/Chats/HeaderChoose';
import FriendItem from '../../../components/Chats/FriendItem';

import styles from './styles';
import {useNavigation} from '@react-navigation/core';
import {getUsers} from '../../../services/api/chats';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {errorFormatter} from '../../../utils/Error';
import {snackbarError} from '../../../store/actions/snackbar';

let id = 0;

const DATA = [
  {
    id: id++,
    name: 'Nissa Sabyan',
  },
  {
    id: id++,
    name: 'Rio Dewanto',
  },
  {
    id: id++,
    name: 'Deddy Corbuzier',
  },
  {
    id: id++,
    name: 'Isyana Sarasvati NO',
  },
  {
    id: id++,
    name: 'Tompi',
  },
  {
    id: id++,
    name: 'Peppy',
  },
  {
    id: id++,
    name: 'Prof. Winarto',
  },
  {
    id: id++,
    name: 'Prilly Latuconsina',
  },

  {
    id: id++,
    name: 'Isyana Sarasvati Taken',
  },
  {
    id: id++,
    name: 'Tompi Another',
  },
];

export default function ChatList() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  const [users, setUsers] = useState([]);
  const authReducer = useSelector(state => state.authReducer, shallowEqual);
  const {token} = authReducer.user;

  useEffect(() => {
    getUsers(token)
      .then(res => {
        setUsers(res.data.data);
      })
      .catch(err => {
        const msg = errorFormatter(err);
        dispatch(snackbarError(msg));
      });
  }, [token, dispatch]);

  const checklistHandler = userId => {
    if (selected.findIndex(index => index === userId) === -1) {
      setSelected(prevState => [...prevState, userId]);
    } else {
      let data = selected;

      data.splice(
        data.findIndex(index => index === userId),
        1,
      ),
        setSelected([...data]);
    }
  };

  const renderItem = ({item}) => (
    <FriendItem
      checked={selected.findIndex(index => index === item.id) !== -1}
      item={item}
      name={item.name}
      onPress={() => {
        checklistHandler(item.id);
      }}
    />
  );

  return (
    <View style={styles.container}>
      <HeaderChoose
        search
        title="Choose friends"
        rightText="Create"
        onRightPress={() => navigation.goBack()}
      />
      <FlatList
        contentContainerStyle={styles.flatList}
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selected}
      />
    </View>
  );
}
