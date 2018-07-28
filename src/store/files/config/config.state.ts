import { makeTypedFactory, TypedRecord } from 'typed-immutable-record';

/*-----------------------------------------------------------------------------
The global config state.  Add more propertiesKey definitions when required.
The keys here should match the entries given as the propertiesKeys in routing.module.
If a propertiesKey in routing.module doesn't exist then default will be used.
Removing default from this interface will break the site!
-----------------------------------------------------------------------------*/
interface IConfig {

}

// N.B _dc_settings on the DEXP mode is just for testing while DC/DEXP switch is not
// implemented.  Will be removed when T862 is landed.
const GLOBAL_CONFIG_STATE: IConfig = {

};

export const ConfigFactory = makeTypedFactory<IConfig, IConfigRecord>(GLOBAL_CONFIG_STATE);

export interface IConfigRecord extends TypedRecord<IConfigRecord>, IConfig { }
