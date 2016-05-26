import express from 'express';
import { Server } from 'http';
import socketIO from 'socket.io';
import Baobab from 'baobab';
import { run } from '../shared/helpers';
import Container from '../shared/Container';
import Applicative from '../shared/Applicative';
import Continuation from '../shared/Continuation';
import IO from '../shared/IO';
import bodyParser from 'body-parser';

const tree = new Baobab({ comments: {} });
const app = express();
const http = Server(app);
const socket = socketIO(http);
const logger = (...x) => {
  console.log(...x, new Date());
  return logger;
};

export default (worker, api) => {
  const Logger = Applicative(logger);
  const Socket = Container(socket);
  const Http = Container(http);
  const Fetch = Continuation('https://www.reddit.com/r/AskReddit/comments/.json?limit=100');
  const State = IO({ tree, comments: tree.select('comments') });
  const App = Container({ app, express })
    .map(({ app, express }) => {
      app.use(express.static(`${__dirname}/public`));
      return { app, express };
    });

  run(
    worker(State, Fetch, Logger),
    api(
      App,
      Socket,
      Http,
      Logger,
      State
    )
  );
}
