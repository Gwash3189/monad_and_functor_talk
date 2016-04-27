import { expect } from 'chai';

import Left from './../../src/shared/Left.js';

describe('Left', function () {
  let left;

  beforeEach(() => {
    left = Left(3);
  })

  it('contains the value', function () {
    expect(left.value)
      .to.eql(3);
  });

  it('dose not maps the value', function () {
    expect(left.map(x => x + 3).value)
      .to.eql(3);
  });

  it('returns the current left', function() {
    expect(left.flatMap(x => Left(x + 3)).value)
      .to.eql(3)
  });
});
