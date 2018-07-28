import { TestBed } from '@angular/core/testing';
import * as Immutable from 'immutable';

import { rootReducer } from './../index.reducers';
import { AppStateFactory } from './../index.state';
import { PropertiesKeyActions } from './properties-key.actions';


describe('propertiesKeyReducer', () => {
  const state1 = AppStateFactory();

  const statePath: any[] = ['propertiesKey'];

  beforeEach(() => {
    TestBed.configureTestingModule({ });
  });

  it('should return a properly formed state when calling a default action', () => {
    // first check the state factory is setting up the messages subtree as expected
    expect(state1.getIn(statePath)).toEqual('');
    // check that calling an action not working on this part of the state doesn't modify it
    const state2 = rootReducer(state1, {
      type: 'default'
    });
    expect(Immutable.is(state1, state2)).toBeTruthy();
  });

  it('should return the new state when UPDATE is called', () => {
    const state2 = rootReducer(
      state1,
      {
        type: PropertiesKeyActions.UPDATE,
        payload: 'companies'
      }
    );
    expect(Immutable.is('companies', state2.propertiesKey)).toBeTruthy();
  });

  it('should return the default state when RESET is called', () => {
    const state2 = rootReducer(
      state1,
      {
        type: PropertiesKeyActions.UPDATE,
        payload: 'companies_detail'
      }
    );
    const state3 = rootReducer(
      state2,
      {
        type: PropertiesKeyActions.RESET
      }
    );
    expect(Immutable.is(state1, state3)).toBeTruthy();
  });


});
