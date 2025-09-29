import {
  View,
  Text,
  ImageSourcePropType,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import { Plus } from 'lucide-react-native';

interface CardPropTypes {
  src: ImageSourcePropType;
  title: string;
  type: string;
  price: number;
}
const { width } = Dimensions.get('window');
const CoffeeCard: React.FC<CardPropTypes> = ({ price, src, title, type }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={src} style={styles.cardImg} />
      <Text style={styles.titleStyle}>{title}</Text>
      <Text style={styles.typeStyle}>{type}</Text>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          justifyContent: 'space-between',
          height: '15%',
        }}
      >
        <Text style={styles.priceStyle}>$ {price}</Text>
        <TouchableOpacity style={styles.btnStyle}>
          <Plus size={20} color={'white'} strokeWidth={1.3} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: width / 2.3,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 10,
    marginLeft: '4%',

    marginBottom: -20,
  },
  btnStyle: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#C67C4E',
    borderRadius: 10,
    backgroundColor: '#C67C4E',
  },
  cardImg: {
    height: 128,
    width: 140,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 15,
  },
  titleStyle: {
    fontFamily: 'Sora-VariableFont_wght',
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    fontSize: 16,
    marginTop: 5,
  },
  typeStyle: {
    fontFamily: 'Sora-VariableFont_wght',
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    fontSize: 12,
    color: '#A2A2A2',
  },
  priceStyle: {
    fontFamily: 'Sora-VariableFont_wght',
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    fontSize: 18,
  },
});

export default CoffeeCard;
