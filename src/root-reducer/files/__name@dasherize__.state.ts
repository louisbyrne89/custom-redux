import { makeTypedFactory, TypedRecord } from 'typed-immutable-record';


export interface I<%= classify(name) %>State {
}

const <%= classify(name) %>: I<%= classify(name) %>State = {
};

export const <%= classify(name) %>StateFactory = makeTypedFactory<I<%= classify(name) %>State, I<%= classify(name) %>StateRecord>(<%= classify(name) %>);

export interface I<%= classify(name) %>StateRecord extends TypedRecord<I<%= classify(name) %>StateRecord>, I<%= classify(name) %>State { }
