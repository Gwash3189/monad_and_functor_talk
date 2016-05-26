// @flow

import IO from '../shared/IO';
import type { Monad, IOMonad} from '../types';
import { thunk,
  pluck,
  currentData,
  previousData,
  listen,
  on,
  emit,
  diff,
} from '../shared/helpers';

export default (App: Monad, Socket: Monad, Http: Monad, Logger: Monad, State: IOMonad) => IO(() => {
  return Http.map(listen(8080, () => {
    Logger.ap('Listening on port 8080');
  }))
  .flatMap(thunk(Socket))
  .flatMap(thunk(App));
})
.flatMap(() => State
    .map(pluck('comments'))
    .map(on('update', (e: { data: { previousData: any, currentData: any } }) => {
      Logger.ap('Emmiting new Comments');
      Socket.map(emit('comments', diff(previousData(e), currentData(e))));
    }))
);
