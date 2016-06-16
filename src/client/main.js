import * as bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import reactDom from 'react-dom';
import socket from 'socket.io-client';
import Baobab from 'baobab';

import IO from '../shared/IO';
import Continuation from '../shared/Continuation';
import CommentList from './CommentsList';
import { run, toJson, merge } from '../shared/helpers';

const Deps = IO({
  document,
  dom: reactDom,
  socket: IO(socket()),
  state: IO(new Baobab({ comments: {} })),
  comments: Continuation('/comments')
});

run(
  Deps
  .map(({ document, dom, socket, state, comments }) => {
    dom.render(
      CommentList({ socket, state }),
      document.getElementById('main')
    );

    return { state, comments };
  })
  .map(({ comments, state }) => ({ comments: comments.map(toJson), state }))
  .map(({ comments, state }) => comments
    .map(comments => state.map(merge({ comments })))
    .map(run)
  )
  .map(run)
);
