import { IActionPayload } from './../index.actions';
import { PropertiesKeyActions } from './properties-key.actions';

/*-----------------------------------------------------------------------------
The propertiesKeyReducer is dispached by the PropertiesKeyActions.
-----------------------------------------------------------------------------*/
export function propertiesKeyReducer(
  state: string = '',
  action: IActionPayload<any>
): string {
  switch (action.type) {

    case PropertiesKeyActions.UPDATE:
      return action.payload;

    case PropertiesKeyActions.RESET:
      return '';

    default:
      return state;
  }
}
