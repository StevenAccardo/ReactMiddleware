import axios from 'axios';
import { FETCH_USERS } from './types';

export function fetchUsers() {
  //Axios returns a promise whenever it make a request
  const request = axios.get('https://jsonplaceholder.typicode.com/users');
  return {
    type: FETCH_USERS,
    payload: request
  };
}
