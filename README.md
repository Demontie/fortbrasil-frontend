## Instalação na maquina local

```bash
# Clonar repositório
$ git clone https://github.com/Demontie/fortbrasil-frontend.git

# Pasta do clone
$ cd fortbrasil-frontend

# Instalar dependências
$ yarn install

# Execute a aplicação
$ yarn start
```

### Instalação utilizando [docker](https://www.docker.com/).

```bash
# Clonar repositório
$ git clone https://github.com/Demontie/fortbrasil-frontend.git

# Pasta do clone
$ cd fortbrasil-frontend

# Crie o arquivo .env com base no modelo .env.example é importante preencher o .env corretamente.
$ cp .env.example .env

# Subir a aplicação
$ docker-compose up -d
```
