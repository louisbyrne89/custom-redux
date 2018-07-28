import { IActionPayload } from '../index.actions';
import { IConfigRecord } from './config.state';

// No changes are allowed (yet) to the global config state.
export function configReducer(
  state: IConfigRecord,
  action: IActionPayload<IConfigRecord>
): IConfigRecord {
  switch (action.type) {
    default:
      return state;
   }
}
