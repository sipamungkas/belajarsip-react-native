import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Card, Avatar} from 'react-native-paper';
import HeaderChoose from '../../../components/Chats/HeaderChoose';
import DefaultGroup from '../../../assets/icons/default-group.png';

import styles from './styles';
import {useNavigation} from '@react-navigation/core';
import DefaultAvatar from '../../../assets/icons/default-avatar.png';

const participants = [
  {id: 1, name: 'You'},
  {id: 2, name: 'Nissa Sabyan'},
  {id: 3, name: 'Isyana sarasvati'},
];

export default function ChatList() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <HeaderChoose
        title="Group details"
        rightText="Create"
        onRightPress={() => navigation.goBack()}
      />
      <Card>
        <Card.Content>
          <View style={styles.description}>
            <Avatar.Image
              source={DefaultGroup}
              size={100}
              style={styles.avatar}
            />
            <TextInput placeholder="Group name" style={styles.textInput} />
          </View>
          <Text style={styles.instruction}>
            Fill group name and choose optional group profile
          </Text>
        </Card.Content>
      </Card>
      <Card style={styles.participantCard}>
        <Card.Title title="Participants 3" titleStyle={styles.title} />
        <Card.Content style={styles.participantContainer}>
          {participants.map(data => (
            <View key={data.id} style={styles.avatarContainer}>
              <Avatar.Image size={60} source={DefaultAvatar} />
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
        </Card.Content>
      </Card>
    </View>
  );
}
