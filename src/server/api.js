import IO from '../shared/IO';
import { thunk, call, pluck, post, currentData, listen, on, emit, stringify, log, ok } from '../shared/helpers';

export default (App, Socket, Http, Logger, State) => {
  return IO(() => {
    return Http.map(listen(8080, function () {
      Logger.ap('Listening on port 8080');
    }))
    .flatMap(thunk(Socket))
    .flatMap(thunk(App))
  })
  .flatMap(() => {
    return State
      .map(pluck('comments'))
      .map(on('update', (e) => {
        Logger.ap('Emmiting new Comments');
        Socket.map(emit('comments'), currentData(e))
        Logger.ap(`Total Number: ${Object.keys(currentData(e)).length}`);
      }));
  });
};
