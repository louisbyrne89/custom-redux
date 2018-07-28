import { makeTypedFactory, TypedRecord } from 'typed-immutable-record';

/*-----------------------------------------------------------------------------
This is the base config interface for each resource page mode
-----------------------------------------------------------------------------*/
interface IProperties {

}

const INITIAL_PROPERTIES_CONFIG: IProperties = {

};

export const PropertiesFactory = makeTypedFactory<IProperties, IPropertiesRecord>(INITIAL_PROPERTIES_CONFIG);

export interface IPropertiesRecord extends TypedRecord<IPropertiesRecord>, IProperties { }
