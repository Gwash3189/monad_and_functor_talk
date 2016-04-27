import { expect } from 'chai';

import Container from '../../src/shared/Container.js';

describe('Container', function () {
  let container;

  beforeEach(() => {
    container = Container(3);
  })

  it('contains the value', function () {
    expect(container.value)
      .to.eql(3);
  });

  it('maps the value', function () {
    expect(container.map(x => x + 3).value)
      .to.eql(6);
  });

  it('maps the value', function () {
    expect(container.map(x => x + 3).value)
      .to.eql(6);
  });

  it('unwraps the double container', function() {
    expect(container.flatMap(x => Container(x + 3)).value)
      .to.eql(6)
  });
});
