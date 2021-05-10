import React from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Card} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import Item from '../../components/Activity/MyClassItem';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

export default function MyClass() {
  const renderItem = ({item}) => <Item title={item.title} />;

  const pageList = [1, 2, 3];

  const HeaderList = () => (
    <View
      style={{flexDirection: 'row', paddingHorizontal: 10, marginVertical: 15}}>
      <View style={{flex: 4}}>
        <Text style={styles.thead}> Class Name</Text>
      </View>
      <View style={{flex: 2, alignItems: 'center'}}>
        <Text style={styles.thead}>Progress</Text>
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={styles.thead}>Score</Text>
      </View>
      <View style={{width: 20}}></View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={<HeaderList />}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={course => course.id}
      />
      <View style={styles.pageCount}>
        <Text>1 of 64 items</Text>
      </View>
      <View style={styles.pageContainer}>
        <Card elevation={2} style={styles.pageItem} theme={{roundness: 8}}>
          <TouchableOpacity style={styles.page}>
            <Ionicons name="chevron-back" />
          </TouchableOpacity>
        </Card>
        {pageList.map((page, index) => (
          <Card
            key={index}
            elevation={2}
            style={styles.pageItem}
            theme={{roundness: 8}}>
            <TouchableOpacity style={styles.page}>
              <Text>{page}</Text>
            </TouchableOpacity>
          </Card>
        ))}

        <Card elevation={2} style={styles.pageItem} theme={{roundness: 8}}>
          <TouchableOpacity style={styles.page}>
            <Ionicons name="chevron-forward" />
          </TouchableOpacity>
        </Card>
      </View>
    </SafeAreaView>
  );
}
