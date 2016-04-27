import IO from '../shared/IO';
import { thunk, call, post, listen, on, emit, stringify, log, ok } from '../shared/helpers';

export default (App, Socket, Http, Logger, Store) => {
  return IO(() => {
    return Http.map(listen(8080, function () {
      Logger.ap('listening on port 8080');
    }))
    .flatMap(thunk(Socket))
    .flatMap(thunk(App))

    Store.map(listen((state) => {
      Logger.ap('Emmiting new state');
      Socket.map(emit('comments', state));
    }));
  });
};
