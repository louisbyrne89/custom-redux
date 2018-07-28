import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';

import { IAppStateRecord } from '@app/store/index.state';

@Injectable()
export class <%= classify(name) %><% if(appendRoot) { %><%= classify(root) %><% } %>Actions {
  static RESET = '<%= dasherize(name)%><% if(appendRoot) { %><%= classify(root) %><% } %>/RESET';
  constructor(
    private store: NgRedux<IAppStateRecord>,
  ) { }
}
