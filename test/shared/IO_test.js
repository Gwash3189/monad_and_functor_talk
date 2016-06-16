import { expect } from 'chai';

import IO from '../../src/shared/IO.js';

describe('IO', () => {
  const ioValue = () => 3;
  let io;

  beforeEach(() => {
    io = IO(ioValue);
  });

  it('contains the value', () => {
    expect(io.value)
      .to.eql(ioValue);
  });

  it('composes the funcs together', () => {
    expect(io.map(x => x + 3).perform())
      .to.eql(6);
  });

  it('unwraps the double io', () => {
    expect(io.flatMap(x => IO(x + 3)).perform())
      .to.eql(6);
  });
});
