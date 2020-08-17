/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import api from '../../services/api';
import Container from '../../components/Container/index';

export default class Home extends Component {
  state = {
    myLocation: {
      lat: -3.732714,
      long: -38.526997,
    },
    shops: [],
    info: false,
  };

  componentDidMount() {
    this.handleLocation();
    this.handleLoadShops();
  }

  handleLoadShops = async () => {
    const { data } = await api.get('/shops');
    this.setState({ shops: data });
  };

  handleLocation = () => {
    const { myLocation } = this.state;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        myLocation.lat = position.coords.latitude;
        myLocation.long = position.coords.longitude;
        this.setState({ myLocation });
      });
    }
  };

  toggleInfo = () => {
    const { info } = this.state;
    this.setState({
      info: !info,
    });
  };

  render() {
    const { info, shops, myLocation } = this.state;

    const myLocationIcon = new window.google.maps.MarkerImage(
      '/me.png',
      null,
      null,
      null,
      new window.google.maps.Size(40, 40)
    );

    const shopIcon = new window.google.maps.MarkerImage(
      '/shop.png',
      null,
      null,
      null,
      new window.google.maps.Size(40, 40)
    );

    const MapComponent = withGoogleMap((props) => (
      <GoogleMap defaultZoom={12} defaultCenter={myLocation}>
        {props.children}
      </GoogleMap>
    ));

    return (
      <Container>
        <MapComponent
          containerElement={<div style={{ height: `600px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        >
          <GoogleMap defaultZoom={12} defaultCenter={myLocation}>
            <Marker position={myLocation} icon={myLocationIcon} />
            {shops.map((shop) => (
              <Marker
                key={shop.id}
                position={{
                  lat: shop.lat,
                  lng: shop.long,
                }}
                icon={shopIcon}
                onClick={this.toggleInfo}
              >
                {info && (
                  <InfoWindow>
                    <div style={{ color: 'black' }}>Shop {shop.name}</div>
                  </InfoWindow>
                )}
              </Marker>
            ))}
          </GoogleMap>
        </MapComponent>
      </Container>
    );
  }
}
