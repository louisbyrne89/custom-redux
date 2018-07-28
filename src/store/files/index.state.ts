import { makeTypedFactory, TypedRecord } from 'typed-immutable-record';

import { ConfigFactory, IConfigRecord } from './config/config.state';
import { IPropertiesRecord, PropertiesFactory } from './properties/properties.state';

export interface IAppState {
  config: IConfigRecord;
  properties: IPropertiesRecord;
  propertiesKey: string;
  router: string;
}

const INITIAL_APP_STATE: IAppState = {
  config: ConfigFactory(),
  properties: PropertiesFactory(),
  propertiesKey: '',
  router: ''
};

export const AppFactory = makeTypedFactory<IAppState, IAppStateRecord>(INITIAL_APP_STATE);

export interface IAppStateRecord extends TypedRecord<IAppStateRecord>, IAppState { }
