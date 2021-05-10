import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Searchbar, Button, Menu, Divider} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Color from '../../../Color';

import styles from './styles';

export default function SearchBox(props) {
  const [catFilter, setCatFilter] = useState();
  const [levelFilter, setLevelFilter] = useState();
  const [priceFilter, setPriceFilter] = useState();
  const [showCat, setShowCat] = useState(false);
  const [showLevel, setShowLevel] = useState(false);
  const [showPrice, setShowPrice] = useState(false);

  return (
    <View>
      <View style={styles.searchRow}>
        <Searchbar
          style={styles.search}
          placeholder="Quick Search"
          inputStyle={{fontSize: 12}}
          //   onChangeText={''}
          //   value={'searchQuery'}
        />
        <Button
          mode="contained"
          color={Color.PRIMARY}
          style={{height: '100%', flexDirection: 'row', alignItems: 'center'}}
          uppercase={false}>
          <Text style={{fontSize: 12}}>Search</Text>
        </Button>
      </View>
      <View style={styles.filter}>
        <Menu
          visible={showCat}
          onDismiss={() => setShowCat(false)}
          anchor={
            <Text onPress={() => setShowCat(true)} style={styles.filterItem}>
              {catFilter === 'category-az'
                ? 'Category A-Z'
                : !catFilter
                ? 'Category'
                : 'Category Z-A'}
              <Ionicons name="chevron-down" />
            </Text>
          }>
          <Menu.Item
            onPress={() => {
              setCatFilter('category-az');
              setShowCat(false);
            }}
            title="Category A-Z"
          />
          <Menu.Item
            onPress={() => {
              setCatFilter('category-za');
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
              {levelFilter === 'level-az'
                ? 'Level A-Z'
                : !levelFilter
                ? 'Level'
                : 'Level Z-A'}
              <Ionicons name="chevron-down" />
            </Text>
          }>
          <Menu.Item
            onPress={() => {
              setLevelFilter('level-az');
              setShowLevel(false);
            }}
            title="Level A-Z"
          />
          <Menu.Item
            onPress={() => {
              setLevelFilter('level-za');
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
              {priceFilter === 'price-az'
                ? 'Lowest Price'
                : !priceFilter
                ? 'Price'
                : 'Highest Price'}
              <Ionicons name="chevron-down" />
            </Text>
          }>
          <Menu.Item
            onPress={() => {
              setPriceFilter('price-az');
              setShowPrice(false);
            }}
            title="Lowest Price"
          />
          <Menu.Item
            onPress={() => {
              setPriceFilter('price-za');
              setShowPrice(false);
            }}
            title="Highest Price"
          />
        </Menu>
      </View>
    </View>
  );
}
