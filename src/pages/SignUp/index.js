/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-named-as-default */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { FaSpinner, FaUserAlt } from 'react-icons/fa';

import { Link } from 'react-router-dom';

import api from '../../services/api';
import Container from '../../components/Container/index';
import LinksText from '../../components/LinksText/index';
import InputTextField from '../../components/InputTextField/index';
import Form from '../../components/Form/index';
import SubmitButton from '../../components/SubmitButton/index';
import MsgErro from '../../components/MsgErro/index';

export default class Shop extends Component {
  state = {
    userForm: {
      name: '',
      email: '',
      password: '',
    },
    loading: false,
    erro: false,
    msgErro: null,
  };

  handleInputChange = (e) => {
    const { value, id } = e.target;
    const { userForm } = this.state;
    userForm[id] = value;
    this.setState(userForm);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      this.setState({ loading: true });
      const { userForm } = this.state;
      await api.post('/users', userForm);

      this.setState({
        userForm: {
          name: '',
          email: '',
          password: '',
        },
        loading: false,
        erro: false,
        msgErro: null,
      });

      alert('Usuario cadastrado com sucesso!');
      window.location = '/';
    } catch (err) {
      this.setState({ loading: false });

      const { data } = err.response;
      const { error } = data;
      this.setState({ erro: true, msgErro: error });
    }
  };

  render() {
    const { userForm, loading, erro, msgErro } = this.state;
    const { name, email, password } = userForm;

    return (
      <Container>
        <h1>
          <FaUserAlt />
          Usuário
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
              id="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={this.handleInputChange}
            />
          </InputTextField>
          <InputTextField>
            <input
              id="password"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={this.handleInputChange}
            />
          </InputTextField>

          <LinksText>
            <SubmitButton loading={loading ? 1 : 0}>
              {loading ? <FaSpinner color="#FFF" size={14} /> : 'Salvar'}
            </SubmitButton>
          </LinksText>
        </Form>
        <LinksText>
          <Link to="/">Ja possuo conta</Link>
        </LinksText>
      </Container>
    );
  }
}
