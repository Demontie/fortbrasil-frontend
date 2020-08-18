/* eslint-disable import/no-named-as-default */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { FaSpinner, FaSignInAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container/index';
import LinksText from '../../components/LinksText/index';
import InputTextField from '../../components/InputTextField/index';
import Form from '../../components/Form/index';
import MsgErro from '../../components/MsgErro/index';
import SubmitButton from '../../components/SubmitButton/index';

export default class SignIn extends Component {
  state = {
    email: 'admin@fortbrasil.com',
    password: '123456',
    loading: false,
    erro: false,
    msgErro: null,
  };

  handleInputChangeEmail = (e) => {
    this.setState({ email: e.target.value, erro: false, msgErro: null });
  };

  handleInputChangeSenha = (e) => {
    this.setState({ password: e.target.value, erro: false, msgErro: null });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      this.setState({ loading: true });
      const { email, password } = this.state;

      const { data } = await api.post('/login', { email, password });
      sessionStorage.setItem('token', JSON.stringify(data.token));
      sessionStorage.setItem('user', JSON.stringify(data.user));
      setTimeout(() => {
        window.location = '/home';
      }, 1000);
      this.setState({ loading: false });
    } catch (err) {
      this.setState({ loading: false });
      console.log(err);
      const { data } = err.response;
      const { error } = data;
      this.setState({ erro: true, msgErro: error });
    }
  };

  render() {
    const { email, password, loading, erro, msgErro } = this.state;

    return (
      <Container>
        <h1>
          <FaSignInAlt />
          Login
        </h1>

        {erro && (
          <MsgErro>
            <h1>{msgErro}</h1>
          </MsgErro>
        )}

        <Form onSubmit={this.handleSubmit} error={erro}>
          <InputTextField>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={this.handleInputChangeEmail}
            />
            <label>Email</label>
          </InputTextField>
          <InputTextField>
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={this.handleInputChangeSenha}
            />

            <label>Senha</label>
          </InputTextField>
          <LinksText>
            <SubmitButton loading={loading ? 1 : 0}>
              {loading ? <FaSpinner color="#FFF" size={14} /> : 'Login'}
            </SubmitButton>
          </LinksText>
        </Form>
        <LinksText>
          <Link to="/signUp">Não tem uma conta?</Link>
        </LinksText>
      </Container>
    );
  }
}
