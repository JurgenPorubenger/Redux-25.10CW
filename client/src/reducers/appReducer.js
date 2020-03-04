import {
    USERS_SUCCESS,
    USERS_LOADING,
    USERS_ERR
} from '../../src/actions/actionTypes';
// import update from 'immutability-helper';


const initialState = {
    users: [],
    status: 'loading' // loading/success/err
};

export default function(state=initialState, action){
    switch (action.type) {
        case USERS_LOADING:
            return {...state, status: 'loading'};
        case USERS_SUCCESS:
            // console.log(state);
            return {...state,
                users: action.users ,
                status: 'success'
            };
        case USERS_ERR:
            return {...state,
                status: 'err'};
        default:
            return state;
    }

}
