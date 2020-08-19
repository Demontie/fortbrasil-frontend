/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { FaHome, FaWarehouse, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import api from '../../services/api';
import Container from '../../components/Container/index';

import LinksText from '../../components/LinksText/index';
import { ShopsList, ButtonClick } from './styles';

export default class Home extends Component {
  state = {
    myLocation: {
      lat: -3.732714,
      lng: -38.526997,
    },
    shops: [],
    shopsWithDistance: [],
    loading: false,
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

  handleLocationShop = async () => {
    this.setState({ loading: true });
    const { myLocation } = this.state;
    const { data } = await api.post('/shopLocation', myLocation);

    this.setState({ shopsWithDistance: data, loading: false });
  };

  handleLocation = async () => {
    const { myLocation } = this.state;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        myLocation.lat = position.coords.latitude;
        myLocation.lng = position.coords.longitude;
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

  handleSignOut = () => {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('user');
    window.location = '/';
  };

  render() {
    const { info, shops, myLocation, shopsWithDistance, loading } = this.state;

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
        <h1>
          <span>
            <FaHome />
            Home
          </span>
          <div>
            <Link to="/shops">
              <button type="button">Cadastrar estabelecimento</button>
            </Link>
            <button type="button" onClick={this.handleSignOut}>
              Sair
            </button>
          </div>
        </h1>
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
                  lat: Number(shop.lat),
                  lng: Number(shop.long),
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
        <LinksText>
          <ButtonClick
            onClick={this.handleLocationShop}
            loading={loading ? 1 : 0}
          >
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              'Localizar Estabelecimentos'
            )}
          </ButtonClick>
        </LinksText>
        <ShopsList>
          {shopsWithDistance.map((shopDistance) => (
            <li key={shopDistance.shop.id}>
              <FaWarehouse />
              <div>
                <strong>
                  <label htmlFor="label">{shopDistance.shop.name}</label>

                  <span>{shopDistance.distance.toFixed(2)} Km</span>
                </strong>
              </div>
            </li>
          ))}
        </ShopsList>
      </Container>
    );
  }
}
