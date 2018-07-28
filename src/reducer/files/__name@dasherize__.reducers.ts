import { IActionPayload } from '@app/store/index.actions';
import { I<%= classify(name) %><% if(appendRoot) { %><%= classify(root) %><% } %>StateRecord, <%= classify(name) %><% if(appendRoot) { %><%= classify(root) %><% } %>StateFactory } from './<%= dasherize(name) %>.state'
import { <%= classify(name) %><% if(appendRoot) { %><%= classify(root) %><% } %>Actions } from './<%= dasherize(name) %>.actions';

export function <%= classify(name) %><% if(appendRoot) { %><%= classify(root) %><% } %>Reducers(
  state: I<%= classify(name) %><% if(appendRoot) { %><%= classify(root) %><% } %>StateRecord = <%= classify(name) %><% if(appendRoot) { %><%= classify(root) %><% } %>StateFactory(),
  action: IActionPayload<any>
): I<%= classify(name) %><% if(appendRoot) { %><%= classify(root) %><% } %>StateRecord {

  switch (action.type) {

    case <%= classify(name) %><% if(appendRoot) { %><%= classify(root) %><% } %>Actions.RESET:
      return <%= classify(name) %><% if(appendRoot) { %><%= classify(root) %><% } %>StateFactory();

    default:
      return state;
  }
}