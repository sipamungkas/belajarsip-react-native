import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import HeaderChoose from '../../../components/Chats/HeaderChoose';
import FriendItem from '../../../components/Chats/FriendItem';

import styles from './styles';
import {useNavigation} from '@react-navigation/core';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {getUsers} from '../../../services/api/chats';
import {errorFormatter} from '../../../utils/Error';
import {snackbarError} from '../../../store/actions/snackbar';
import {ActivityIndicator, Card} from 'react-native-paper';

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

  const checklistHandler = item => {
    if (selected.findIndex(data => data.id === item.id) === -1) {
      setSelected(prevState => [...prevState, item]);
    } else {
      let data = selected;
      data.splice(
        data.findIndex(data => data.id === item.id),
        1,
      ),
        setSelected([...data]);
    }
  };
  console.log(selected);
  const renderItem = ({item}) => (
    <FriendItem
      checked={selected.findIndex(data => data.id === item.id) !== -1}
      item={item}
      name={item.name}
      checkbox
      onPress={() => {
        checklistHandler(item);
      }}
    />
  );

  return (
    <View style={styles.container}>
      <HeaderChoose
        right
        search
        title="Choose friends"
        onRightPress={() => navigation.navigate('CreateGroup')}
      />
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
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selected}
      />
    </View>
  );
}
