import {
  View,
  Text,
  ImageSourcePropType,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import { Plus } from 'lucide-react-native';
import { CoffeePics } from '../../types/constants';
import { CoffeeItem } from '@shared/api/database';
interface CardPropTypes {
  src: ImageSourcePropType | string;
  title: string;
  type: string;
  price: number;
  onPress: () => void;
}
const { width, height } = Dimensions.get('window');
const CoffeeCard: React.FC<CardPropTypes> = ({
  price,
  src,
  title,
  type,
  onPress,
}) => {
  const [hasError, setHasError] = useState<Boolean>(false);

  const fallBackImage = CoffeePics[5];
  const imageSource = hasError
    ? fallBackImage
    : typeof src === 'string'
    ? { uri: src }
    : src;
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <Image
        source={imageSource}
        style={styles.cardImg}
        onError={() => setHasError(true)}
      />
      <Text style={styles.titleStyle}>{title}</Text>
      <Text style={styles.typeStyle}>{type}</Text>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'auto',
        }}
      >
        <Text style={styles.priceStyle}>$ {price}</Text>

        <TouchableOpacity style={styles.btnStyle}>
          <Plus size={20} color={'white'} strokeWidth={1.3} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
    height: (height - 50) / 3.4,
    marginBottom: '5%',
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
    fontWeight: '700',
    marginTop: '3%',
  },
});

export default CoffeeCard;
