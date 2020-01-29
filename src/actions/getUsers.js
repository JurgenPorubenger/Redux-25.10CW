import axios from 'axios';
import {
    HANDLE_INC,
    USERS_SUCCESS,
    USERS_LOADING,
    USERS_ERR
} from './actionTypes';

export const getUsers = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: USERS_LOADING
            });
            const data = await axios.get('https://jsonplaceholder.typicode.com/tod');
            return await dispatch({
                type: USERS_SUCCESS,
                users: data.data,
            })
        } catch (e) {
            return await dispatch({
                type: USERS_ERR,
            })
        }
        }
  };
