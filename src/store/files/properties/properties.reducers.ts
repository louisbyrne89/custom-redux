import { IActionPayload } from './../index.actions';
import { IPropertiesRecord, PropertiesFactory } from './properties.state';
import { PropertiesActions } from './properties.actions';

/*-----------------------------------------------------------------------------
The propertiesReducer is dispached by the PropertiesActions. It sets the properties
in the top-level of the store, which will be a copy of one the subtrees of the config
from the store.  The properties can be subscribed to by any component that needs to
set view elements depending on which page and page mode is being viewed, e.g. toolbar
buttons.
-----------------------------------------------------------------------------*/
export function propertiesReducer(
  state: IPropertiesRecord = PropertiesFactory(),
  action: IActionPayload<any>
): IPropertiesRecord {
  switch (action.type) {

    case PropertiesActions.UPDATE:
      return action.payload;

    case PropertiesActions.RESET:
      return PropertiesFactory();

    default:
      return state;
  }
}
