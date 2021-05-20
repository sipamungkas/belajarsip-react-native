import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {Card} from 'react-native-paper';
import ModalSelector from 'react-native-modal-selector';

import styles from './styles';

export default function index() {
  const data = [
    {key: 0, section: true, label: 'Categories'},
    {key: 1, label: 'Software'},
    {key: 2, label: 'Finance'},
  ];
  return (
    <Card>
      <Card.Title titleStyle={styles.title} title="Create new course" />
      <Card.Content>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Class Name:</Text>
          <TextInput placeholder="Input Class Name" />
        </View>
        <View style={[styles.inputContainer]}>
          <Text style={styles.label}>Categories:</Text>
          <ModalSelector
            optionContainerStyle={{backgroundColor: 'white'}}
            cancelStyle={{backgroundColor: 'white'}}
            cancelText="Cancel"
            data={data}
            initValue="Select something yummy!"
            onChange={option => {
              alert(`${option.label} (${option.key}) nom nom nom`);
            }}>
            <TextInput placeholder="Select Category" />
          </ModalSelector>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Price:</Text>
          <TextInput keyboardType="decimal-pad" placeholder="Input Price ($)" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Schedule:</Text>
          <TextInput placeholder="Select Date" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Time:</Text>
          <TextInput placeholder="Select Time" />
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.label}>Description:</Text>
          <TextInput
            multiline
            numberOfLines={4}
            style={styles.description}
            placeholder="Please Input Description"
          />
        </View>
      </Card.Content>
    </Card>
  );
}
