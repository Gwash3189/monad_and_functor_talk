import {
  pluck,
  currentData,
  previousData,
  on,
  emit,
  json,
  diff,
  run
} from '../shared/helpers';

export default ({ app, Socket, http, Logger, State }) => {
  app.get('/comments', (req, res) => {
    run(
      State
        .map(pluck('comments'))
        .map(comments => res.map(json(comments.get())))
    );
  });

  http.listen(8080, () => {
    Logger.ap('Listening on port 8080');
  });

  return State
    .map(pluck('comments'))
    .flatMap(on('update', (e) => {
      Logger.ap('Emmiting new Comments');
      run(Socket.map(emit('comments', diff(previousData(e), currentData(e)))));
    }));
};
