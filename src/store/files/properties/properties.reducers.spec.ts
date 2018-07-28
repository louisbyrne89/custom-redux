import { TestBed } from '@angular/core/testing';
import * as Immutable from 'immutable';

import { PropertiesFactory } from './properties.state';
import { rootReducer } from './../index.reducers';
import { AppStateFactory } from './../index.state';
import { PropertiesActions } from './properties.actions';


describe('propertiesReducer', () => {
  const state1 = AppStateFactory();

  const statePath: any[] = ['properties'];

  const updated_properties = PropertiesFactory({
    showAddCompaniesButton: true,
    showYearsDropdown: false,
    showAdvancedMenu: false,
    showMergeButton: false,
    showCurrencySelector: false,
    showBodyNavigation: false,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({ });
  });

  it('should return a properly formed state when calling a default action', () => {
    // first check the state factory is setting up the messages subtree as expected
    expect(state1.getIn(statePath)).toEqual(PropertiesFactory());
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
        type: PropertiesActions.UPDATE,
        payload: updated_properties
      }
    );
    expect(Immutable.is(updated_properties, state2.properties)).toBeTruthy();
  });

  it('should return the default state when RESET is called', () => {
    const state2 = rootReducer(
      state1,
      {
        type: PropertiesActions.UPDATE,
        payload: updated_properties
      }
    );
    const state3 = rootReducer(
      state2,
      {
        type: PropertiesActions.RESET
      }
    );
    expect(Immutable.is(state1, state3)).toBeTruthy();
  });


});
