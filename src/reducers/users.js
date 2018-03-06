import { FETCH_USERS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_USERS:
      //spread operator flattens the arrays and adds the new data from the API repsonse onto whatever was already held within state
      return [...state, ...action.payload.data];
  }
  //handles default case
  return state;
}
