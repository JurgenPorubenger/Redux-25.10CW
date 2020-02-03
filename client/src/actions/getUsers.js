import axios from 'axios';
import {
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
            const data = await axios.get('http://localhost:3001/remainingTodos');
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
