import { run } from '../shared/helpers';

export default (worker, api) => (State, Logger, Fetch, App, Socket, Http) => {
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
