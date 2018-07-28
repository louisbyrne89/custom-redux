import { MockNgRedux } from '@angular-redux/store/testing';
import { NgRedux } from '@angular-redux/store';
import { TestBed } from '@angular/core/testing';

import { PropertiesActions } from './properties.actions';
import { PropertiesFactory } from './properties.state';
import { PAGE_MODE } from './../page-mode/page-mode.state';
import { StoreStub } from '../../testing/store/redux-store-stubs';

describe('PropertiesActions', () => {

  let store: MockNgRedux;
  let actions: PropertiesActions;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        PropertiesActions,
        {
          provide: NgRedux,
          useValue: StoreStub
        },
      ]
    });

    store = TestBed.get(NgRedux);
    actions = TestBed.get(PropertiesActions);

  });

  it('should be created', () => {
    expect(actions).toBeTruthy();
  });

  it('should dispatch a RESET action when using reset orchestrator', () => {
    spyOn(store, 'dispatch');
    actions.reset();
    expect(store.dispatch).toHaveBeenCalledWith({type: PropertiesActions.RESET});
  });

  it('should dispatch an UPDATE action when using updateProperties orchestrator', () => {
    spyOn(store, 'dispatch');
    actions.update('default', PAGE_MODE.DEXP);
    expect(store.dispatch).toHaveBeenCalledWith({type: PropertiesActions.UPDATE, payload: PropertiesFactory()});
  });
});
