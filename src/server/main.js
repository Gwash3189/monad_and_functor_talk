import express from 'express';
import { Server } from 'http';
import socketIO from 'socket.io';
import Baobab from 'baobab';
import { run } from '../shared/helpers';
import Applicative from '../shared/Applicative';
import Continuation from '../shared/Continuation';
import IO from '../shared/IO';

const tree = new Baobab({ comments: {} });
const app = express();
const http = Server(app);
const socket = socketIO(http);
const logger = (...x) => {
  console.log(...x, new Date());
  return logger;
};

export default ({ worker, api }) => {
  const Logger = Applicative(logger);
  const Socket = IO(socket);
  const Fetch = Continuation('https://www.reddit.com/r/AskReddit/comments/.json?limit=100');
  const State = IO({ tree, comments: tree.select('comments') });

  app.use(express.static(`${__dirname}/public`));
  app.use((req, res, next) => {
    req.map = (f) => {
      f(req);
      return req;
    };

    res.map = (f) => {
      f(res);
      return res;
    };

    next();
  });

  run(
    worker({ State, Fetch, Logger }),
    api({
      app,
      Socket,
      http,
      Logger,
      State
    })
  );
};
