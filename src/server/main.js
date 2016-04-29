export default (state, worker, api) => (State, Logger, Fetch, App, Socket, Http) => {
  run(
    state(State, Logger)
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
