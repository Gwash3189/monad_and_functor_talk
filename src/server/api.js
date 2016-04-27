import IO from '../shared/IO';
import { thunk, call, post, listen, on, emit, stringify, log, ok } from '../shared/helpers';

export default (App, Socket, Http, Logger, Store) => {
  Store.map(listen((state) => {
    Socket.map(emit('comments', state));
  }));

  return Http
    .map(listen(8080, function () {
      debugger;
      Logger.ap('listening on port 8080');
    }))
    .flatMap(thunk(Socket))
    .flatMap(thunk(App));
};
