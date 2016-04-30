import repl from "repl";
import { polyfill } from 'es6-promise';
import fetch from 'isomorphic-fetch';
import express from 'express';
import socketIO from 'socket.io';
import { Server } from 'http';
import bodyParser from 'body-parser';
import Baobab from 'baobab';
polyfill();

import api from './api';
import main from './main'
import worker from './worker';
import Container from '../shared/Container';
import Applicative from '../shared/Applicative';
import Continuation from '../shared/Continuation';
import IO from '../shared/IO';

const tree = new Baobab({ comments: {} });
const app = express();
const http = Server(app);
const socket = socketIO(http);
const logs = [];
const logger = (...x) => {
  logs.push(...x, new Date());
  return logger;
}
const state = { tree, comments: tree.select('comments') };

const Logger = Applicative(logger);
const Socket = Container(socket);
const Http = Container(http);
const Fetch = Continuation('https://www.reddit.com/r/AskReddit/comments/.json?limit=100')
const State = IO(state);
const App = Container({ app, express })
  .map(({ app, express }) =>{
    app.use(express.static(`${__dirname}/public`));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    return { app, express };
  });
const replServer = repl.start({
  prompt: "CommentStream > ",
});


replServer.context.state = state;
replServer.context.State = State;
replServer.context.Logs = logs;
replServer.context.Fetch = Fetch;
replServer.context.App = App;
replServer.context.Socket = Socket;
replServer.context.Http = Http;

main(worker, api)(State, Logger, Fetch, App, Socket, Http);
