/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-named-as-default */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  FaSpinner,
  FaSignInAlt,
  FaWarehouse,
  FaTrashAlt,
} from 'react-icons/fa';

import api from '../../services/api';
import Container from '../../components/Container/index';
import LinksText from '../../components/LinksText/index';
import InputTextField from '../../components/InputTextField/index';
import Form from '../../components/Form/index';
import SubmitButton from '../../components/SubmitButton/index';

import MsgErro from '../../components/MsgErro/index';
import { ShopsList } from './styles';

export default class Shop extends Component {
  state = {
    shopForm: {
      name: '',
      description: '',
      lat: '',
      long: '',
    },
    shops: [],
    loading: false,
    erro: false,
    msgErro: null,
  };

  componentDidMount() {
    this.handleLoadShops();
  }

  handleLoadShops = async () => {
    const { data } = await api.get('/shops');
    this.setState({ shops: data });
  };

  handleInputChange = (e) => {
    const { value, id } = e.target;
    const { shopForm } = this.state;
    shopForm[id] = value;
    this.setState(shopForm);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      this.setState({ loading: true });
      const { shopForm } = this.state;
      const { id } = shopForm;

      if (id) {
        await api.put(`/shops/${id}`, shopForm);
      } else {
        await api.post('/shops', shopForm);
      }

      this.setState({
        shopForm: { name: '', description: '', lat: '', long: '' },
        loading: false,
        erro: false,
        msgErro: null,
      });
      const msg = id
        ? 'Estabelecimento atualizado com sucesso!'
        : 'Estabelecimento cadastrado com sucesso!';
      alert(msg);

      this.handleLoadShops();
      // eslint-disable-next-line no-alert
    } catch (err) {
      this.setState({ loading: false });

      const { data } = err.response;
      const { error } = data;
      this.setState({ erro: true, msgErro: error });
    }
  };

  handleEdit = async (shop) => {
    const { shopForm } = this.state;
    const { id, name, description, lat, long } = shop;
    shopForm.id = id;
    shopForm.name = name;
    shopForm.description = description;
    shopForm.lat = lat;
    shopForm.long = long;
    this.setState(shopForm);
    return true;
  };

  handleDelete = async (e, shop) => {
    e.preventDefault();
    e.stopPropagation();
    const { id } = shop;
    await api.delete(`/shops/${id}`);
    alert('Excluido com sucesso!');
    this.handleLoadShops();
    return true;
  };

  render() {
    const {
      name,
      description,
      shops,
      lat,
      long,
      loading,
      erro,
      msgErro,
    } = this.state;

    return (
      <Container>
        <h1>
          <span>
            <FaSignInAlt />
            Estabelecimento
          </span>
          <div>
            <Link to="/home">
              <button type="button">Voltar</button>
            </Link>
          </div>
        </h1>

        {erro && (
          <MsgErro>
            <h1>{msgErro}</h1>
          </MsgErro>
        )}

        <Form onSubmit={this.handleSubmit} error={erro}>
          <InputTextField>
            <input
              id="name"
              type="text"
              placeholder="Nome"
              value={name}
              onChange={this.handleInputChange}
            />
          </InputTextField>
          <InputTextField>
            <input
              id="description"
              type="text"
              placeholder="Descricao"
              value={description}
              onChange={this.handleInputChange}
            />
          </InputTextField>
          <InputTextField>
            <input
              id="lat"
              type="text"
              placeholder="Latitude"
              value={lat}
              onChange={this.handleInputChange}
            />
          </InputTextField>
          <InputTextField>
            <input
              id="long"
              type="text"
              placeholder="Longitude"
              value={long}
              onChange={this.handleInputChange}
            />
          </InputTextField>

          <LinksText>
            <SubmitButton loading={loading ? 1 : 0}>
              {loading ? <FaSpinner color="#FFF" size={14} /> : 'Salvar'}
            </SubmitButton>
          </LinksText>
        </Form>
        <ShopsList>
          {shops.map((shop) => (
            <li key={shop.id} onClick={() => this.handleEdit(shop)}>
              <FaWarehouse />
              <div>
                <strong>
                  <label htmlFor="label">{shop.name}</label>

                  <span>{shop.description}</span>
                </strong>
              </div>
              <div>
                <strong>
                  <button
                    type="button"
                    onClick={(e) => this.handleDelete(e, shop)}
                  >
                    <FaTrashAlt />
                  </button>
                </strong>
              </div>
            </li>
          ))}
        </ShopsList>
      </Container>
    );
  }
}
