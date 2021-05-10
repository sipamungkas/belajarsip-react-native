import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Searchbar, Button, Menu, Divider} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Color from '../../../Color';

import styles from './styles';

export default function SearchBox(props) {
  const [thisSearch, setThisSearch] = useState('');
  const [catFilter, setCatFilter] = useState();
  const [levelFilter, setLevelFilter] = useState();
  const [priceFilter, setPriceFilter] = useState();
  const [showCat, setShowCat] = useState(false);
  const [showLevel, setShowLevel] = useState(false);
  const [showPrice, setShowPrice] = useState(false);

  const searchHandler = () => {
    props.setSearch(thisSearch);
  };

  return (
    <View>
      <View style={styles.searchRow}>
        <Searchbar
          style={styles.search}
          placeholder="Quick Search"
          inputStyle={{fontSize: 12}}
          onChangeText={text => setThisSearch(text)}
          value={thisSearch}
        />
        <Button
          mode="contained"
          color={Color.PRIMARY}
          style={{height: '100%', flexDirection: 'row', alignItems: 'center'}}
          uppercase={false}
          onPress={() => searchHandler()}>
          <Text style={{fontSize: 12}}>Search</Text>
        </Button>
      </View>
      <View style={styles.filter}>
        <Menu
          visible={showCat}
          onDismiss={() => setShowCat(false)}
          anchor={
            <Text onPress={() => setShowCat(true)} style={styles.filterItem}>
              {props.sort === 'category-az'
                ? 'Category A-Z'
                : !props.sort
                ? 'Category'
                : 'Category Z-A'}
              <Ionicons name="chevron-down" />
            </Text>
          }>
          <Menu.Item
            onPress={() => {
              props.setSort('category-az');
              setShowCat(false);
            }}
            title="Category A-Z"
          />
          <Menu.Item
            onPress={() => {
              props.setSort('category-za');
              setShowCat(false);
            }}
            title="Category Z-A"
          />
        </Menu>
        <Menu
          visible={showLevel}
          onDismiss={() => setShowLevel(false)}
          anchor={
            <Text onPress={() => setShowLevel(true)} style={styles.filterItem}>
              {props.sort === 'level-az'
                ? 'Level A-Z'
                : !props.sort
                ? 'Level'
                : 'Level Z-A'}
              <Ionicons name="chevron-down" />
            </Text>
          }>
          <Menu.Item
            onPress={() => {
              props.setSort('level-az');
              setShowLevel(false);
            }}
            title="Level A-Z"
          />
          <Menu.Item
            onPress={() => {
              props.setSort('level-za');
              setShowLevel(false);
            }}
            title="Level Z-A"
          />
        </Menu>
        <Menu
          visible={showPrice}
          onDismiss={() => setShowPrice(false)}
          anchor={
            <Text onPress={() => setShowPrice(true)} style={styles.filterItem}>
              {props.sort === 'price-az'
                ? 'Lowest Price'
                : !props.sort
                ? 'Price'
                : 'Highest Price'}
              <Ionicons name="chevron-down" />
            </Text>
          }>
          <Menu.Item
            onPress={() => {
              props.setSort('price-az');
              setShowPrice(false);
            }}
            title="Lowest Price"
          />
          <Menu.Item
            onPress={() => {
              props.setSort('price-za');
              setShowPrice(false);
            }}
            title="Highest Price"
          />
        </Menu>
      </View>
    </View>
  );
}
