import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import pic from '../assests/Image/landing.png';
import React from 'react';
interface LandingProps {
  onComplete: () => void;
}
const Landing: React.FC<LandingProps> = ({ onComplete }) => {
  const { height } = useWindowDimensions();

  const handleGetStarted = () => {
    onComplete();
  };

  return (
    <View style={styles.container}>
      <View style={{ ...styles.imgContainer, height: height / 4.2 }}>
        <Image
          source={pic}
          style={{
            ...styles.imgStyle,
          }}
        />
      </View>
      <View style={styles.body}>
        <Text style={{ ...styles.bodyText, top: height / 4.2 }}>
          Fall in Love With{' '}
        </Text>
        <Text style={{ ...styles.bodyText, top: height / 4.2 }}>
          {' '}
          Coffee in Blissfull
        </Text>
        <Text style={{ ...styles.bodyText, top: height / 4.2 }}> Delight!</Text>
      </View>
      <Text style={{ ...styles.pg, marginTop: height / 2.7 }}>
        Welcome to our cozy coffee corner, where every cup is a delightful for
        you
      </Text>

      <TouchableOpacity style={styles.btn} onPress={handleGetStarted}>
        <Text style={styles.btnTxt}> Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  imgStyle: {
    position: 'absolute',
    resizeMode: 'contain',
    width: '100%',
    transform: [{ scale: 1.2 }],
  },
  imgContainer: {
    top: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'black',
  },
  body: {
    alignContent: 'center',
    alignItems: 'center',
    padding: 30,
    width: '100%',
  },
  bodyText: {
    fontSize: 30,
    fontWeight: 'semibold',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Sora-VariableFont_wght',
    letterSpacing: 0.16,
  },
  pg: {
    fontFamily: 'Sora-VariableFont_wght',
    color: 'gray',
    textAlign: 'center',
    padding: 20,
    fontSize: 14,
    width: '100%',
    justifyContent: 'center',
    fontWeight: '400',
  },
  btn: {
    width: '90%',
    bottom: '10%',
    position: 'absolute',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    left: '10%',
    zIndex: 1,
    padding: 20,
    backgroundColor: '#C67C4E',
  },
  btnTxt: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Sora-VariableFont_wght',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
});

export default Landing;
