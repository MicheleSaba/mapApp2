import React, { Component } from 'react';
import * as Location from 'expo-location';
import { View } from 'react-native';
import * as Permissions from 'expo-permissions';
import MapView, {Marker, PROVIDER_GOOGLE } from 'react-native-maps';
var mapStyle = require('./assets/mapstyle.json');

export default class App extends Component {
  state = {
    location: null,
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.error('not granted!');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let newBoMarket = (await Location.geocodeAsync('1100 3rd St SE'))[0];
    let hyVee = (await Location.geocodeAsync('20 Wilson Ave SW'))[0];
    let theDaisy = (await Location.geocodeAsync('208 12th Ave SE'))[0];
    console.log(newBoMarket);
    console.log(hyVee);
    console.log(theDaisy);

    this.setState({
      location,
      places: {
        newBoMarket,
        hyVee,
        theDaisy,
      },
    });
    console.log(location);
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  render() {
    if (!this.state.location) {
      return <View />;
    } else
      return (
        <MapView
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.922 / 5,
            longitudeDelta: 0.0421 / 5,
          }}
        >
          <Marker
            coordinate={this.state.location.coords}
            title="You Are Here"
            pinColor="#0099ff"
          />
          <Marker
            coordinate={this.state.places.newBoMarket}
            title="New Bo Market"
            pinColor="#ff8c1a"
            // image={require('./assets/images/NewBoMarketLogo.png')}
            description="Vendor Day March 25th to March 27th! Click to see more"
          />
          <Marker
            coordinate={this.state.places.theDaisy}
            title="The Daisy"
            pinColor="#79ff4d"
            // image={require('./assets/images/TheDaisy.png')}
            description="20% off Blue Tags"
          />
          <Marker
            coordinate={this.state.places.hyVee}
            title="Hy-Vee"
            description="20% off Viva Paper Towels"
            // image={require('./assets/images/hy_vee.png')}
            pinColor="red"
          />
        </MapView>
      );
  }
}
