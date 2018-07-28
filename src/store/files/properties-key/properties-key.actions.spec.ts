import { MockNgRedux } from '@angular-redux/store/testing';
import { NgRedux } from '@angular-redux/store';
import { TestBed } from '@angular/core/testing';

import { PropertiesKeyActions } from './properties-key.actions';
import { StoreStub } from '../../testing/store/redux-store-stubs';

describe('PropertiesKeyActions', () => {

  let store: MockNgRedux;
  let actions: PropertiesKeyActions;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        PropertiesKeyActions,
        {
          provide: NgRedux,
          useValue: StoreStub
        },
      ]
    });

    store = TestBed.get(NgRedux);
    actions = TestBed.get(PropertiesKeyActions);

  });

  it('should be created', () => {
    expect(actions).toBeTruthy();
  });

  it('should dispatch a RESET action when using reset orchestrator', () => {
    spyOn(store, 'dispatch');
    actions.reset();
    expect(store.dispatch).toHaveBeenCalledWith({type: PropertiesKeyActions.RESET});
  });

  it('should dispatch an UPDATE action when using update orchestrator', () => {
    spyOn(store, 'dispatch');
    actions.update('companies');
    expect(store.dispatch).toHaveBeenCalledWith({type: PropertiesKeyActions.UPDATE, payload: 'companies'});
  });
});
