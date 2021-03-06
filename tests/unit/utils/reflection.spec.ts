import {
  setControllerMetadata,
  getControllerMetadata,
  setMethodMetadata,
  getMethodMetadata,
  hasControllerMetadata,
} from '../../../src/utils/reflection';
import { RoutingMethod } from '../../../src/types';

describe('controller metadata', () => {
  class FirstController {}
  class SecondController {}

  it(`allows storage and retrieval of the controllers' metadata`, () => {
    const metadata = { middlewares: [], errorMiddlewares: [], basePath: 'bar' };
    expect(hasControllerMetadata(FirstController)).toEqual(false);
    setControllerMetadata(FirstController, metadata);
    expect(getControllerMetadata(FirstController)).toEqual(metadata);
    expect(hasControllerMetadata(FirstController)).toEqual(true);
  });

  it('returns a default value when the controller does not have any metadata', () => {
    const expectedDefault = { middlewares: [], errorMiddlewares: [], basePath: '' };
    expect(getControllerMetadata(SecondController)).toEqual(expectedDefault);
    expect(hasControllerMetadata(SecondController)).toEqual(false);
  });
});

describe('method metadata', () => {
  class FirstController {
    methodA() {
      return true;
    }
  }
  class SecondController {
    methodB() {
      return true;
    }
  }

  it(`allows storage and retrieval of the methods' metadata`, () => {
    const metadata = {
      middlewares: [],
      errorMiddlewares: [],
      routes: [
        {
          verb: 'get' as RoutingMethod,
          path: '/foo',
        },
      ],
    };
    setMethodMetadata(FirstController, 'methodA', metadata);
    expect(getMethodMetadata(FirstController, 'methodA')).toEqual(metadata);
  });

  it('returns a default value when the method does not have any metadata', () => {
    const expectedDefault = { middlewares: [], errorMiddlewares: [], routes: [] };
    expect(getMethodMetadata(SecondController, 'methodB')).toEqual(expectedDefault);
  });
});
