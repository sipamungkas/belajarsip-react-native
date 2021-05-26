import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {Card} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {connect, useDispatch} from 'react-redux';

import Color from '../../Color';

import styles from './styles';

import Header from '../../components/Header';
import Item from '../../components/Activity/MyClassItemInstructor';

import {API_URL} from '@env';
import {errorFormatter} from '../../utils/Error';
import {snackbarError} from '../../store/actions/snackbar';

function MyClass(props) {
  const [refreshing, setRefreshing] = useState(false);
  const [myClasses, setMyClasses] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [info, setInfo] = useState({});
  const [totalPage, setTotalPage] = useState(0);
  const [itemLoading, setItemLoading] = useState(false);
  const dispatch = useDispatch();
  const pageList = () => {
    let pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setMyClasses(null);
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
        setRefreshing(false);
      })
      .catch(err => {
        const msg =
          err.response.status === 401
            ? 'Session Expired, please logout and login again'
            : errorFormatter(err);
        dispatch(snackbarError(msg));
        setRefreshing(false);
      });
  }, [token, currentPage, dispatch]);

  const prevPageHandler = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };
  const nextPageHandler = () => {
    if (currentPage === totalPage) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };
  const pages = pageList();

  const limit = 5;
  const {token} = props.authReducer.user;

  useEffect(() => {
    setItemLoading(true);
    setMyClasses([]);
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
        setItemLoading(false);
      })
      .catch(err => {
        const msg =
          err.response.status === 401
            ? 'Session Expired, please logout and login again'
            : errorFormatter(err);
        dispatch(snackbarError(msg));
        setItemLoading(false);
      });
  }, [token, currentPage, props, dispatch]);

  const renderItem = ({item}) => <Item {...props} course={item} />;

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
      <View style={{width: 20}} />
    </View>
  );

  return (
    <SafeAreaView>
      <Header back title="My Class" {...props} />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.container}
        ListHeaderComponent={<HeaderList />}
        data={myClasses}
        renderItem={renderItem}
        keyExtractor={course => course.id}
        ListEmptyComponent={
          <Card style={{padding: 10}}>
            {refreshing || itemLoading ? (
              <ActivityIndicator color={Color.PRIMARY} />
            ) : (
              <Text style={{textAlign: 'center'}}>
                You don't have any class
              </Text>
            )}
          </Card>
        }
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

const mapStateToProps = state => {
  return {
    authReducer: state.authReducer,
  };
};

const ConnectedMyClass = connect(mapStateToProps)(MyClass);

export default ConnectedMyClass;
