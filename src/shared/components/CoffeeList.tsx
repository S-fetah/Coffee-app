import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CoffeeCard from './CoffeeCard';

import { CoffeeItem, endpoints } from '../api/database';
import { scale, verticalScale } from '@shared/utils/responsive';

const { width } = Dimensions.get('window'); // screen width

type listProps = {
  onPress: (item: CoffeeItem) => void;
};

type CoffeeType = 'All Coffee' | 'Machiato' | 'Latte' | 'Americano';

type filterItemType = {
  selected: string;
  text: string;
  setSelected: (category: CoffeeType) => void; // ✅ parameter name + type
};

const FilterItem: React.FC<filterItemType> = ({
  selected,
  text,
  setSelected,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.item,
        backgroundColor: selected === text ? '#C67C4E' : '#EDEDED59',
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
  );
};
const CoffeeList: React.FC<listProps> = ({ onPress }) => {
  const [selected, setSelected] = useState<string>('All');

  const [categories, setCategories] = useState<string[]>([]);

  const [menu, setMenu] = useState<CoffeeItem[] | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchCoffee = async (): Promise<void> => {
      try {
        const result = await endpoints.GetCoffees('GET');

        if (Array.isArray(result) && isMounted) {
          setMenu(result);
          setCategories([...new Set(result?.map(e => e.category))]);
        }
      } catch (error) {
        console.error('fetchError: ', error);
      }
    };
    fetchCoffee();

    return () => {
      isMounted = false;
    };
  }, []);

  const updateSelected = (value: CoffeeType) => {
    setSelected(value);
  };

  const ct: string[] = ['All', ...categories];

  const displayedCoffees = menu
    ? selected === 'All'
      ? menu
      : menu.filter(item => item.category === selected)
    : [];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.coffeeTypes}
        contentContainerStyle={styles.coffeeTypesContent}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {ct &&
          ct.map(e => (
            <FilterItem
              key={e}
              selected={selected}
              text={e}
              setSelected={updateSelected}
            />
          ))}
      </ScrollView>
      <FlatList
        data={displayedCoffees}
        renderItem={({ item }: { item: CoffeeItem }) => (
          <CoffeeCard
            price={item.price}
            src={item.image}
            title={item.name}
            type={item.category}
            onPress={() => onPress(item)}
          />
        )}
        keyExtractor={item => String(item.id)}
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
    marginHorizontal: 12,
    width: scale(333),
    height: verticalScale(40),
    marginBottom: 10,
  },
  coffeeTypesContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10), // 👈 Adds even spacing between all buttons!
    paddingRight: scale(16), // Gives comfortable breathing room at the end of the scroll
  },
  item: {
    paddingHorizontal: scale(14), // 👈 Expands automatically for long or short names!
    paddingVertical: verticalScale(8),
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
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
