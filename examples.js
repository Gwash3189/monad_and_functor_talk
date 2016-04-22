(() => {
  const dependency = 'the thing';

  //pure
  const pure = (dep) => dep.toUpperCase();
  //not pure
  const notPure = () => dependency.toLowerCase();
})()


(() => {
  import curry from 'lodash/curry';

  const add = curry((x, y) => x + y);

  add(1, 2) // 3
  add(1)(2) // 3
})()


(() => {
  import flowRight from 'lodash/flowRight';
  const add = curry((x, y) => x + y);
  const square = curry((n) => n * n);

                              //second //first
  const addSquare = flowRight(square,  add);

  addSquare(1, 2) // 9
})()

(() => {
  fetch('/users')
    .then(response.json())
    .then(users => users.filter(user => name.indexOf('Frank') > -1))
})()


(() => {
  const getUsers = () => {
    return fetch('/users')
      .then(response => response.json())
  }

  const getFranks = (users) => {
    return users
      .filter(user => name.indexOf('Frank') > -1)
  }

  getUsers
    .then(getFranks)
})()

(() => {
  const arr = [
    'John',
    'Steve',
    'Frank',
    'Mark',
    'Homer'
  ];

  //['JOHN','STEVE','FRANK','MARK','HOMER']
  const loudNames = arr.map(name => name.toUpperCase())
})()

(() => {
  const arr = [
    'some',
    'more',
    'names',
    'that',
    'i',
    'thought',
    'of'
  ];

  const another = [
    'a',
    'couple',
    'more',
    'names',
    '...',
    'two',
    'more'
  ];

  /**
  [ [ 'some', 'some', 'some', 'some', 'some', 'some', 'some' ],
  [ 'more', 'more', 'more', 'more', 'more', 'more', 'more' ],
  [ 'names', 'names', 'names', 'names', 'names', 'names', 'names' ],
  [ 'that', 'that', 'that', 'that', 'that', 'that', 'that' ],
  [ 'i', 'i', 'i', 'i', 'i', 'i', 'i' ],
  [ 'thought',
    'thought',
    'thought',
    'thought',
    'thought',
    'thought',
    'thought' ],
  [ 'of', 'of', 'of', 'of', 'of', 'of', 'of' ] ]
  */
  const loudNames = arr.map(name => {
    return another.map(anotherName => {
      return name
    });
  });
})()
