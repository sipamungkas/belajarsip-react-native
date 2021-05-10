import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Card} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Color from '../../Color';

import styles from './styles';

import Header from '../../components/Header';
import Item from '../../components/Activity/MyClassItem';

import {API_URL} from '@env';

export default function MyClass(props) {
  const [myClasses, setMyClasses] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [info, setInfo] = useState({});
  const [totalPage, setTotalPage] = useState(0);
  const pageList = () => {
    let pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const prevPageHandler = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };
  const nextPageHandler = page => {
    if (currentPage === totalPage) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };
  const pages = pageList();

  const limit = 5;
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJuYW1lIjoiQnVyaGFuIFVwZGF0ZWEiLCJyb2xlX2lkIjoyLCJpYXQiOjE2MjA2NjE0ODUsImV4cCI6MTYyMDc0Nzg4NSwiaXNzIjoiQkVMQUpBUlNJUCJ9.6yArS41aouxWaBt1kq2FSL-pmxDmrV77oqBX4ZYcgj0';
  useEffect(() => {
    axios
      .get(
        `${API_URL}/v1/courses/my-class?search=&sort=&page=${currentPage}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        setMyClasses(res.data.data);
        setInfo(res.data.info);
        setTotalPage(res.data.info.total_page);
      })
      .catch(err => {
        console.log(err);
      });
  }, [token, currentPage]);

  const renderItem = ({item}) => <Item course={item} />;

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
    <SafeAreaView>
      <Header back title="My Class" {...props} />
      <FlatList
        style={styles.container}
        ListHeaderComponent={<HeaderList />}
        data={myClasses}
        renderItem={renderItem}
        keyExtractor={course => course.id}
      />
      <View style={styles.pageCount}>
        <Text>
          {(info?.current_page - 1) * limit + (myClasses?.length || 0)} of{' '}
          {info?.total || 0} items
        </Text>
      </View>
      <View style={styles.pageContainer}>
        <Card elevation={2} style={styles.pageItem} theme={{roundness: 8}}>
          <TouchableOpacity
            style={styles.page}
            onPress={prevPageHandler}
            disabled={info?.prev !== null}>
            <Ionicons name="chevron-back" />
          </TouchableOpacity>
        </Card>
        {pages.map((page, index) => (
          <Card
            key={index}
            elevation={2}
            style={{
              ...styles.pageItem,
              backgroundColor: page === currentPage ? Color.PRIMARY : 'white',
            }}
            theme={{roundness: 8}}>
            <TouchableOpacity
              style={styles.page}
              onPress={() => setCurrentPage(page)}>
              <Text style={{color: page === currentPage ? 'white' : 'black'}}>
                {page}
              </Text>
            </TouchableOpacity>
          </Card>
        ))}

        <Card
          elevation={2}
          style={styles.pageItem}
          theme={{roundness: 8}}
          onPress={nextPageHandler}>
          <TouchableOpacity
            style={styles.page}
            disabled={info?.next !== null}
            onPress={nextPageHandler}>
            <Ionicons name="chevron-forward" />
          </TouchableOpacity>
        </Card>
      </View>
    </SafeAreaView>
  );
}
