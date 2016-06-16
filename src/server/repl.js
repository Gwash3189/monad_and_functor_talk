import { polyfill } from 'es6-promise';
polyfill();

import repl from 'repl';
import api from './api';
import worker from './worker';
import express from 'express';
import { Server } from 'http';
import socketIO from 'socket.io';
import Baobab from 'baobab';
import { run } from '../shared/helpers';
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
  logs.push([...x, new Date()]);
  return logger;
};

const Logger = Applicative(logger);
const Socket = Container(socket);
const Http = Container(http);
const Fetch = Continuation('https://www.reddit.com/r/AskReddit/comments/.json?limit=100');
const State = IO({ tree, comments: tree.select('comments') });
const App = Container({ app })
  .map(({ app, express }) => {
    app.use(express.static(`${__dirname}/public`));
    return { app, express };
  });
const replServer = repl.start({ prompt: 'CommentStream > ' });

replServer.context.map = (fun, mon) => mon.map(fun);
replServer.context.Logs = logs;
replServer.context.State = State;
replServer.context.Fetch = Fetch;
replServer.context.App = App;
replServer.context.Socket = Socket;
replServer.context.Http = Http;


run(
  worker({ State, Fetch, Logger }),
  api({
    App,
    Socket,
    Http,
    Logger,
    State
  })
);
