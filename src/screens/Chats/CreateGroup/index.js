import React, {useState} from 'react';
import {Image, View, Text, TextInput} from 'react-native';
import {Card, Avatar} from 'react-native-paper';
import HeaderChoose from '../../../components/Chats/HeaderChoose';
import DefaultGroup from '../../../assets/icons/default-group.png';

import styles from './styles';
import {useNavigation, useRoute} from '@react-navigation/core';
import DefaultAvatar from '../../../assets/icons/default-avatar.png';
import {API_URL} from '@env';
import {createGroup} from '../../../services/api/chats';
import {setIsLoading} from '../../../store/actions/loading';
import {errorFormatter} from '../../../utils/Error';
import {snackbarError} from '../../../store/actions/snackbar';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

export default function ChatList() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [avatarError, setAvatarError] = useState(false);
  const [name, setName] = useState('');
  const route = useRoute();
  const {participants} = route.params;
  const authReducer = useSelector(state => state.authReducer, shallowEqual);
  const {token, id: userId} = authReducer.user;
  console.log(participants);

  return (
    <View style={styles.container}>
      <HeaderChoose
        right
        title="Group details"
        rightText="Create"
        onRightPress={() => {
          dispatch(setIsLoading(true));
          createGroup(token, {members: participants.map(data => data.id), name})
            .then(res => {
              dispatch(setIsLoading(false));
              // console.log(res.data, res.status);
              if (res.status === 200 || res.status === 201) {
                navigation.replace('Message', {
                  roomId: res.data.data.room_id,
                  roomName: name,
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
      <Card>
        <Card.Content>
          <View style={styles.description}>
            <Avatar.Image
              source={DefaultGroup}
              size={100}
              style={styles.avatar}
            />
            <TextInput
              value={name}
              onChangeText={text => setName(text)}
              placeholder="Group name"
              style={styles.textInput}
            />
          </View>
          <Text style={styles.instruction}>
            Fill group name and choose optional group profile
          </Text>
        </Card.Content>
      </Card>
      <Card style={styles.participantCard}>
        <Card.Title title="Participants 3" titleStyle={styles.title} />
        <Card.Content>
          <View style={styles.participantContainer}>
            {participants.map(data => (
              <View key={data.id} style={styles.avatarContainer}>
                {data?.avatar && !avatarError ? (
                  <Image
                    style={styles.avatar}
                    // size={50}
                    height={50}
                    width={50}
                    borderRadius={25}
                    onError={() => setAvatarError(true)}
                    source={{uri: `${API_URL}/images/${data?.avatar}`}}
                  />
                ) : (
                  <Avatar.Text
                    style={styles.avatar}
                    size={50}
                    label={data?.name?.slice(0, 1) || '-'}
                  />
                )}
                <Text numberOfLines={2} style={styles.name}>
                  {data.name}
                </Text>
              </View>
            ))}
            <View style={styles.avatarContainer}>
              <Avatar.Text
                size={60}
                label="+"
                labelStyle={{color: 'black'}}
                style={{backgroundColor: 'rgba(203, 203, 203, 1)'}}
              />
              <Text numberOfLines={2} style={styles.name}>
                Add
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}
