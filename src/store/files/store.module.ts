import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { fromJS } from 'immutable';

import { rootReducer } from './index.reducers';
import { IAppStateRecord } from './index.state';



@NgModule({
  imports: [
    CommonModule,
    NgReduxModule,
    NgReduxRouterModule,
  ],
  declarations: [],
  providers: [NgReduxRouter]
})
export class StoreModule {
  constructor(
    private ngRedux: NgRedux<IAppStateRecord>,
    private ngReduxRouter: NgReduxRouter,
    private devTools: DevToolsExtension

  ) {
    const storeEnhancers = devTools.isEnabled() ?
    [ devTools.enhancer() ] :
    [];

    this.ngRedux.configureStore(
      rootReducer,
      fromJS({}) as IAppStateRecord, // initial state
      [],
      storeEnhancers
    );
  }
}

