import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';

import { IAppStateRecord } from './../index.state';


@Injectable()
export class PropertiesActions {
  static readonly UPDATE = 'properties/UPDATE';
  static readonly RESET = 'properties/RESET';

  constructor(
    private store: NgRedux<IAppStateRecord>,
  ) {}

  updatePropertiesUsingKey(propertiesKey: string) {
    const page_mode = this.store.getState();
    return this.update(propertiesKey);
  }

  /*---------------------------------------------------------------------------
  Update properties in the store using the config data for the propertiesKey and
  pageMode passed in. If there is no entry in config store for this propertiesKey
  then the default for the pageMode is used instead. The propertiesKey for a page
  is set in the routing module using the data key of the routes.
  ---------------------------------------------------------------------------*/
  update(propertiesKey: string) {

    let properties = this.store.getState().getIn(['config', propertiesKey]);
    if (properties === undefined) {
      console.log(`propertiesKey "${propertiesKey}" not found in config`);
      properties = this.store.getState().getIn(['config', 'default',]);
    }

    this.store.dispatch({
      type: PropertiesActions.UPDATE,
      payload: properties
    });
  }

  /*---------------------------------------------------------------------------
  Reset properties in store
  ---------------------------------------------------------------------------*/
  reset() {
    this.store.dispatch({
      type: PropertiesActions.RESET
    });
  }
}
