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

type listProps = {
  onPress: (
    name: string,
    image: any,
    description: string,
    price: number,
  ) => void;
};

type CoffeeType = 'All Coffee' | 'Machiato' | 'Latte' | 'Americano';

type filterItemType = {
  selected: CoffeeType;
  text: CoffeeType;
  setSelected: (category: CoffeeType) => void; // ✅ parameter name + type
};

const FilterItem: React.FC<filterItemType> = ({ selected, text , setSelected}) => {

  return (
    <TouchableOpacity
      style={{
        ...styles.item,
        backgroundColor:
          selected === text ? '#C67C4E' : '#EDEDED59',
      }}
      onPress={() => setSelected(text)}
    >
      <Text
        style={{
          ...styles.coffeeTypeText,
          alignSelf: 'center',
          color: selected === text ? 'white' : '#313131',
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>

  )
}
const CoffeeList: React.FC<listProps> = ({ onPress }) => {


  const [selected, setSelected] = useState<CoffeeType>('All Coffee');

  const updateSelected = (value : CoffeeType) => {
    setSelected(value)
  }

  const ct : CoffeeType[] = ['All Coffee' ,'Machiato' ,'Latte' ,'Americano']
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
        {ct && ct.map(e => (
          <FilterItem
            key={e}
            selected={selected}
            text={e}
            setSelected={updateSelected}
          />
        ))}
      </ScrollView>
      <FlatList
        data={coffeeData}
        renderItem={({ item }) => (
          <CoffeeCard
            price={item.price}
            src={item.src}
            title={item.title}
            type={item.type}
            onPress={() => onPress(item.title, item.src, item.type, item.price)}
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
    marginRight: 10,
    paddingHorizontal: 12,



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
