import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import pic from '../assests/landing.png';
import React from 'react';
const Landing = () => {
  const { height, width } = useWindowDimensions();
  console.log(height);
  console.log(width);
  return (
    <View style={styles.container}>
      <Image
        source={pic}
        style={{
          ...styles.imgStyle,
          width: width,
        }}
      />
      <Text> aliii w kda</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  imgStyle: {
    position: 'absolute',
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'black',
  },
});

export default Landing;
