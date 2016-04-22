import { expect } from 'chai';

import IO from './../../client/types/IO.js';

describe('IO', function () {
  const ioValue = () => 3;
  const apIOValue = (x) => x + 3;
  let io,
      apIO;

  beforeEach(() => {
    io = IO(ioValue);
    apIO = IO(apIOValue);
  })

  it('contains the value', function () {
    expect(io.value)
      .to.eql(ioValue);
  });

  it('composes the funcs together', function () {
    expect(io.map(x => x + 3).perform())
      .to.eql(6)
  });

  it('unwraps the double io', function() {
    expect(io.flatMap(x => IO(x + 3)).perform())
      .to.eql(6)
  });

  it('applies the function in the io to the new container', () => {
    expect(apIO.ap(IO(3)).perform())
      .to.eql(6);
  })
});
