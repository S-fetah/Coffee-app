import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  Platform,
  PermissionsAndroid,
  Alert,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Geolocation from 'react-native-geolocation-service';
import Config from 'react-native-config';
import { Search, Settings2 } from 'lucide-react-native';
import hero from '../assests/Image/heroSection.png';
import CoffeeList from '../components/CoffeeList';
type locationType = {
  country: string;
  state: string;
  name: string;
};
const defaultLocation: locationType = {
  country: 'Locating.......',
  name: '....',
  state: '....',
};
const HomeScreen = () => {
  const [location, setLocation] = useState<locationType>(defaultLocation);

  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const getLocation = async (pos: any): Promise<any> => {
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;

    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${Config.API_KEY}`,
    );
    const data = await response.json();

    const { country, name, state } = data.results[0];
    console.log(data.results);
    setLocation({
      country: country + ', ',
      name: name,
      state: state + ', ',
    });
  };
  const requestLocation = useCallback(async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('permission denied');
        Alert.alert('permission denied');
        return;
      }

      Geolocation.getCurrentPosition(
        pos => {
          getLocation(pos);
          console.log(pos);
        },
        err => console.log(err),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
  }, []);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  const HandlePress = () => {
    requestLocation();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.topView,
          height: height / 3,
          paddingVertical: 30 + insets.top,
        }}
      >
        <Text style={styles.topViewTxt}>location</Text>
        <Pressable onPress={HandlePress}>
          <Text style={styles.locationText}>
            {location
              ? `${location.country}${location.state}${location.name}`
              : 'Fetching location...'}
          </Text>
        </Pressable>
        <View style={styles.searchView}>
          <View style={styles.searchStyle}>
            <Search
              size={25}
              strokeWidth={1.3}
              color={'white'}
              style={{
                position: 'absolute',
                zIndex: 1,
                top: '25%',
                left: '3%',
              }}
            />
            <TextInput
              placeholder="Search Coffee"
              placeholderTextColor={'#A2A2A2'}
              style={{
                flex: 1,
                backgroundColor: '#313131',
                color: 'white',
                letterSpacing: 1,
                textAlign: 'left',
                paddingLeft: '15%',
              }}
            />
          </View>
          <TouchableOpacity style={styles.searchSet}>
            <Settings2 size={17} color={'white'} width={17.5} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.heroSection}>
        <Image
          source={hero}
          style={{
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
          resizeMode="cover"
        />
        <Text
          style={{
            backgroundColor: '#ED5151',
            color: 'white',
            width: '20%',
            textAlign: 'center',
            borderWidth: 1,
            borderRadius: 15,
            borderColor: '#ED5151',
            padding: 5,
            position: 'absolute',
            top: '10%',
            left: '7%',
            fontFamily: 'Sora-VariableFont_wght',
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          Promo
        </Text>
        <Text
          style={{
            color: 'white',
            width: '60%',
            textAlign: 'left',

            padding: 5,
            fontSize: 30,
            position: 'absolute',
            top: '35%',
            left: '7%',
            fontFamily: 'Sora-VariableFont_wght',
            fontWeight: 700,
            letterSpacing: 1,
            zIndex: 2,
          }}
        >
          Buy one get one FREE
        </Text>
        <View
          style={{
            backgroundColor: '#1c1c1c',
            position: 'absolute',
            left: '8%',
            top: '50%',
            height: '15%',
            zIndex: 1,
            width: '49%',
          }}
        />
        <View
          style={{
            backgroundColor: '#1c1c1c',
            position: 'absolute',
            left: '8%',
            top: '73%',
            height: '14%',
            zIndex: 1,
            width: '39%',
          }}
        />
      </View>

      <CoffeeList />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topView: {
    backgroundColor: '#161616ff',

    paddingHorizontal: 15,
  },
  topViewTxt: {
    fontFamily: 'Sora-VariableFont_wght',
    color: '#A2A2A2',
  },
  locationText: {
    color: '#D8D8D8',
    fontFamily: 'Sora-VariableFont_wght',
  },
  searchView: {
    padding: 8,
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    columnGap: 10,
  },
  searchSet: {
    backgroundColor: '#C67C4E',
    width: '18%',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 20,
  },
  searchStyle: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  heroSection: {
    position: 'relative',
    marginTop: '-18%',
    width: '90%',
    overflow: 'hidden',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 15,
    height: '20%',
    borderColor: 'transparent',
  },
});
export default HomeScreen;
