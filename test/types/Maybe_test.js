import { expect } from 'chai';
import { spy } from 'sinon';

import Maybe from './../../client/types/Maybe.js';

describe('Maybe', function () {
  let maybe,
      mapSpy,
      apMaybe;

  beforeEach(() => {
    mapSpy = spy();
    maybe = Maybe(3);
    apMaybe = Maybe((x) => x + 3);
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

  it('applies the function in the Maybe to the new Maybe', () => {
    expect(apMaybe.ap(Maybe(3)).value)
      .to.eql(6);
  });

  it('returns a Nothing if it is given null or undefined', () => {
    Maybe(null).map(mapSpy);

    expect(mapSpy.called)
      .to.not.be.true;

  })
});
