import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ActivityIndicator, Card} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

import Color from '../../../Color';
import SearchBox from '../SearchBox';
import Item from '../AvailableClassItem';

import {API_URL} from '@env';

import styles from './styles';

export default function AvailableClassList(props) {
  const [availableCourses, setAvailableCourses] = useState();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
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
  const nextPageHandler = () => {
    console.log(currentPage);
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
        `${API_URL}/v1/courses?search=${search}&sort=${sort}&page=${currentPage}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        setAvailableCourses(res.data.data);
        setInfo(res.data.info);
        setTotalPage(res.data.info.total_page);
      })
      .catch(err => {
        console.log(err);
      });
  }, [token, currentPage, search, sort]);
  return (
    <View>
      <Text style={styles.title}>New Class</Text>
      <SearchBox
        sort={sort}
        setSort={setSort}
        search={search}
        setSearch={setSearch}
      />
      <View style={styles.courseList}>
        {!availableCourses && (
          <ActivityIndicator animating={true} color={Color.PRIMARY} />
        )}
        {availableCourses?.length === 0 && (
          <View>
            <Text style={{textAlign: 'center', marginTop: 10}}>
              There is no new class
            </Text>
          </View>
        )}
        {availableCourses?.length > 0 &&
          availableCourses.map(item => <Item key={item.id} course={item} />)}
      </View>
      <View style={styles.pageCount}>
        <Text>
          {(info?.current_page - 1) * limit + (availableCourses?.length || 0)}{' '}
          of {info?.total || 0} items
        </Text>
      </View>
      <View style={styles.pageContainer}>
        <Card elevation={2} style={styles.pageItem} theme={{roundness: 8}}>
          <TouchableOpacity
            style={styles.page}
            onPress={prevPageHandler}
            disabled={!info?.prev}>
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
            onPress={nextPageHandler}
            disabled={info?.next === null}>
            <Ionicons name="chevron-forward" />
          </TouchableOpacity>
        </Card>
      </View>
    </View>
  );
}
