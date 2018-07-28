import { combineReducers } from 'redux-immutable';

import { I<%= classify(name) %>StateRecord } from './<%= dasherize(name) %>.state';


export const <%= classify(name) %>Reducers = combineReducers<I<%= classify(name) %>StateRecord>({
});
