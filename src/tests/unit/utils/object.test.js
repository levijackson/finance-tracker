import { cloneObject } from '../../../utils/object';

test('cloning an object works', () => {
  const originalObject = {
    'name': 'Levi Jackson',
    'location': {
        'state': 'NC',
        'city': 'Burlington'
    }
  };

  let newObject = cloneObject(originalObject);
  newObject.name = 'John Doe';

  expect(newObject.name).toBe('John Doe');
  expect(originalObject.name).toBe('Levi Jackson');
});
