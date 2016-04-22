import { expect } from 'chai';

import Container from './../../client/types/Container.js';

describe('Container', function () {
  let container,
      apContainer;

  beforeEach(() => {
    container = Container(3);
    apContainer = Container((x) => x + 3);
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

  it('applies the function in the container to the new container', () => {
    expect(apContainer.ap(Container(3)).value)
      .to.eql(6);
  })
});
