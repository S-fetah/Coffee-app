import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import CoffeeCard from './CoffeeCard';
import { CoffeePics } from '../types/constants';

const { width } = Dimensions.get('window'); // screen width

const CoffeeList = () => {
  const [selected, setSelected] = useState<
    'All Coffee' | 'Machiato' | 'Latte' | 'Americano'
  >('All Coffee');

  const coffeeData = [
    {
      id: '1',
      price: 3.15,
      src: CoffeePics[0],
      title: 'Caffee Mocha',
      type: 'Deep Foam',
    },
    { id: '2', price: 4.2, src: CoffeePics[2], title: 'Latte', type: 'Creamy' },
    {
      id: '3',
      price: 2.95,
      src: CoffeePics[3],
      title: 'Americano',
      type: 'Bold',
    },
    {
      id: '4',
      price: 3.75,
      src: CoffeePics[4],
      title: 'Machiato',
      type: 'Strong',
    },
    {
      id: '5',
      price: 3.75,
      src: CoffeePics[1],
      title: 'Flat White',
      type: 'Espresso',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.coffeeTypes}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          style={{
            ...styles.item,
            backgroundColor:
              selected === 'All Coffee' ? '#C67C4E' : '#EDEDED59',
          }}
          onPress={() => setSelected('All Coffee')}
        >
          <Text
            style={{
              ...styles.coffeeTypeText,
              alignSelf: 'center',
              color: selected === 'All Coffee' ? 'white' : '#313131',
            }}
          >
            All Coffee
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.item,
            backgroundColor: selected === 'Machiato' ? '#C67C4E' : '#EDEDED59',
          }}
          onPress={() => setSelected('Machiato')}
        >
          <Text
            style={{
              ...styles.coffeeTypeText,
              alignSelf: 'center',
              color: selected === 'Machiato' ? 'white' : '#313131',
            }}
          >
            Machiato
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.item,
            backgroundColor: selected === 'Latte' ? '#C67C4E' : '#EDEDED59',
          }}
          onPress={() => setSelected('Latte')}
        >
          <Text
            style={{
              ...styles.coffeeTypeText,
              alignSelf: 'center',
              color: selected === 'Latte' ? 'white' : '#313131',
            }}
          >
            Latte
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.item,
            backgroundColor: selected === 'Americano' ? '#C67C4E' : '#EDEDED59',
          }}
          onPress={() => setSelected('Americano')}
        >
          <Text
            style={{
              ...styles.coffeeTypeText,
              alignSelf: 'center',
              color: selected === 'Americano' ? 'white' : '#313131',
            }}
          >
            Americano
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <FlatList
        data={coffeeData}
        renderItem={({ item }) => (
          <CoffeeCard
            price={item.price}
            src={item.src}
            title={item.title}
            type={item.type}
          />
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.coffeeList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  coffeeTypes: {
    overflow: 'hidden',
    flexDirection: 'row',
    flexGrow: 0,
    paddingHorizontal: 10,

    height: '10%',
  },
  item: {
    width: width / 4,
    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: 5,
    borderRadius: 6,
    marginRight: 10,
  },
  coffeeType: {
    color: '#313131',
  },
  coffeeTypeText: {
    textAlign: 'center',

    fontFamily: 'Sora-VariableFont_wght',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
  },
  coffeeList: {
    paddingBottom: 20,
    width: '100%',
    backgroundColor: '#f9f9f9',
    marginTop: '5%',
  },
});

export default CoffeeList;
