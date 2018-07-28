import { makeTypedFactory, TypedRecord } from 'typed-immutable-record';


interface I<%= classify(name) %><% if(appendRoot) { %><%= classify(root) %><% } %>State {
}

const <%= classify(name) %>: I<%= classify(name) %><% if(appendRoot) { %><%= classify(root) %><% } %>State = {
};

export const <%= classify(name) %><% if(appendRoot) { %><%= classify(root) %><% } %>StateFactory = makeTypedFactory<I<%= classify(name) %><% if(appendRoot) { %><%= classify(root) %><% } %>State, I<%= classify(name) %><% if(appendRoot) { %><%= classify(root) %><% } %>StateRecord>(<%= classify(name) %>);

export interface I<%= classify(name) %><% if(appendRoot) { %><%= classify(root) %><% } %>StateRecord extends TypedRecord<I<%= classify(name) %><% if(appendRoot) { %><%= classify(root) %><% } %>StateRecord>, I<%= classify(name) %><% if(appendRoot) { %><%= classify(root) %><% } %>State { };
