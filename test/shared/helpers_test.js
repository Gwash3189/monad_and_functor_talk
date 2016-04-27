import { expect } from 'chai';

import {thunk, call} from '../../src/shared/helpers';

describe('helpers', () => {
  describe('#thunk', () => {
    let toBeThunked = 3;
    it('returns a function', () => {
      expect(thunk(toBeThunked))
        .to.be.a.function;
    });

    it('returns the thunked value', () => {
      expect(thunk(toBeThunked)())
        .to.eql(toBeThunked);
    });
  });
});
