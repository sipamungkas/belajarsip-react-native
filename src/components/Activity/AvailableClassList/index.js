import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ActivityIndicator, Card} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {
  snackbarError,
  snackbarHide,
  snackbarSuccess,
} from '../../../store/actions/snackbar';
import {setIsLoading} from '../../../store/actions/loading';

import {errorFormatter} from '../../../utils/Error';

import {
  getCourseWithFilter,
  registerToCourse,
} from '../../../services/api/courses';

import Color from '../../../Color';
import SearchBox from '../SearchBox';
import Item from '../AvailableClassItem';

import NotifService from '../../../services/notifications/NotifService';
import styles from './styles';

export default function AvailableClassList(props) {
  const dispatch = useDispatch();
  const authReducer = useSelector(state => state.authReducer, shallowEqual);
  const [availableCourses, setAvailableCourses] = useState();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [price, setPrice] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [info, setInfo] = useState({});
  const [totalPage, setTotalPage] = useState(0);
  const [itemLoading, setItemLoading] = useState(false);

  const {token} = authReducer.user;

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
    if (currentPage === totalPage) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };
  const pages = pageList();

  const limit = 5;

  useEffect(() => {
    setAvailableCourses([]);
    setItemLoading(true);
    getCourseWithFilter(token, search, sort, currentPage, limit, price)
      .then(res => {
        setAvailableCourses(res.data.data);
        setInfo(res.data.info);
        setTotalPage(res.data.info.total_page);
        setItemLoading(false);
      })
      .catch(err => {
        const msg = errorFormatter(err);
        dispatch(snackbarError(msg));
        setItemLoading(false);
      });
  }, [token, currentPage, search, sort, dispatch, price]);

  const notif = new NotifService();

  const registerHandler = course => {
    dispatch(snackbarHide());
    dispatch(setIsLoading(true));
    registerToCourse(token, course.id)
      .then(res => {
        const msg = res?.data?.message || 'Register Success';
        dispatch(setIsLoading(false));
        dispatch(snackbarSuccess(msg));
        if (res.status === 201) {
          notif.localNotif(
            'Class Register Success',
            `Registered to Class ${course?.name} \nOpen the app and check your schedule`,
          );
        }
      })
      .catch(err => {
        const msg = errorFormatter(err);
        dispatch(setIsLoading(false));
        dispatch(snackbarError(msg));
      });
  };

  return (
    <View>
      <Text style={styles.title}>New Class</Text>
      <SearchBox
        sort={sort}
        setSort={setSort}
        search={search}
        setSearch={setSearch}
        price={price}
        setPrice={setPrice}
      />
      <View style={styles.courseList}>
        {!availableCourses && (
          <ActivityIndicator animating={true} color={Color.PRIMARY} />
        )}
        {availableCourses?.length === 0 && (
          <Card>
            <Card.Content>
              {itemLoading ? (
                <ActivityIndicator animating={true} color={Color.PRIMARY} />
              ) : (
                <Text style={{textAlign: 'center', marginTop: 10}}>
                  There is no new class
                </Text>
              )}
            </Card.Content>
          </Card>
        )}
        {availableCourses?.length > 0 &&
          availableCourses.map(item => (
            <Item
              key={item.id}
              course={item}
              onRegister={() => registerHandler(item)}
            />
          ))}
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
