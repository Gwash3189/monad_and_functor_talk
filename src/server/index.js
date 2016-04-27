import express from 'express';
import socketIO from 'socket.io';
import { Server } from 'http';
import bodyParser from 'body-parser';
import { listen, middleware, seedState } from 'duxanator';

import api from './api';
import state from './state';
import Container from '../shared/Container';
import Applicative from '../shared/Applicative';
import IO from '../shared/IO';

const app = express();
const http = Server(app);
const socket = socketIO(http);
const logger = (...x) => {
  console.log(...x);
  return logger;
}

const State = IO({listen, middleware, seedState });
const App = Container({ app, express })
  .map((args) =>{
    app.use(express.static(`${__dirname}/public`))
    app.use(bodyParser.json())
    return app.use(bodyParser.urlencoded({ extended: true }))
  });

state(State).perform();

api(
  App,
  Container(socket),
  Container(http),
  Applicative(logger),
  State
);
