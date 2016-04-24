import { expect } from 'chai';

import Applicative from './../../client/types/Applicative.js';

describe('Applicative', function () {
  let applicative,
      apMonad;

  beforeEach(() => {
    applicative = Applicative(3);
    apMonad = Applicative((x) => x + 3);
  })

  it('contains the value', function () {
    expect(applicative.value)
      .to.eql(3);
  });

  it('maps the value', function () {
    expect(applicative.map(x => x + 3).value)
      .to.eql(6);
  });

  it('maps the value', function () {
    expect(applicative.map(x => x + 3).value)
      .to.eql(6);
  });

  it('unwraps the double applicative', function() {
    expect(applicative.flatMap(x => Applicative(x + 3)).value)
      .to.eql(6)
  });

  it('applies the function in first monad, to the other', function() {
    expect(apMonad.ap(Applicative(3)).value)
      .to.eql(6);
  });
});
