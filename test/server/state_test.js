import { expect } from 'chai';
import { spy } from 'sinon';

import State, { transformState } from '../../src/server/state';

describe('State', () => {
  describe('#transformState', () => {
    let result,
        comments;

    before(() => {
      comments = [
        {
          id: 1,
          saying: 'make javascript great again'
        },
        {
          id: 2,
          sating: 'i hate donald trump'
        }
      ];

      result = transformState({ ap: () => true })({ comments });
    })

    it('indexes comments by id', () => {
      expect(result.comments[1])
        .to.eql(comments[0])

      expect(result.comments[2])
        .to.eql(comments[1])
    });
  });

  describe('Store', () => {
    let mockDuxanator = { middleware: spy(), listen: spy(), seedState: spy() }
    let mockIO = {
      map: (f) => {
        f(mockDuxanator)
        return mockIO;
      }
    };

    before(()=> {
      State(mockIO)
    })

    it('calls seedState with an empty comments tree', () => {
      expect(mockDuxanator.seedState.firstCall.args[0])
        .to.eql({ comments: [] });
    });
  })
});
