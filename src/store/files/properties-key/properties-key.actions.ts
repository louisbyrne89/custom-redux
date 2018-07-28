import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { IAppStateRecord } from './../index.state';


@Injectable()
export class PropertiesKeyActions {
  static readonly UPDATE = 'propertiesKey/UPDATE';
  static readonly RESET = 'propertiesKey/RESET';

  constructor(
    private store: NgRedux<IAppStateRecord>,
  ) {}

  /*---------------------------------------------------------------------------
  Update propertiesKey in the store.  The propertiesKey is given for each routing
  in routing.module using the data key.  The propertiesKey actions are used by
  app.module which subscribes to the router and gets the propertiesKey for the routing.
  the propertiesKey is used to match the routing to the display properties for the page
  given in the config part of the store (see properties.actions).
  ---------------------------------------------------------------------------*/
  update(resourcekey: string) {
    this.store.dispatch({
      type: PropertiesKeyActions.UPDATE,
      payload: resourcekey
    });
  }

  /*---------------------------------------------------------------------------
  Reset propertiesKey in store
  ---------------------------------------------------------------------------*/
  reset() {
    this.store.dispatch({
      type: PropertiesKeyActions.RESET
    });
  }
}
