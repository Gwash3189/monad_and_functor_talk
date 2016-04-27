import { expect } from 'chai';
import { spy } from 'sinon';

import Maybe from './../../src/shared/Maybe.js';

describe('Maybe', function () {
  let maybe,
      mapSpy;

  beforeEach(() => {
    mapSpy = spy();
    maybe = Maybe(3);
  })

  it('contains the value', function () {
    expect(maybe.value)
      .to.eql(3);
  });

  it('maps the value', function () {
    expect(maybe.map(x => x + 3).value)
      .to.eql(6);
  });

  it('unwraps the double Maybe', function() {
    expect(maybe.flatMap(x => Maybe(x + 3)).value)
      .to.eql(6)
  });

  it('returns a Nothing if it is given null or undefined', () => {
    Maybe(null).map(mapSpy);

    expect(mapSpy.called)
      .to.not.be.true;
  })
});
