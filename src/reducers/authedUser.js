export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const CLEAR_AUTHED_USER = 'CLEAR_AUTHED_USER';

export default function authedUser(state = null, action) {
    switch (action.type) {
        case SET_AUTHED_USER:
            return action.id;

        case CLEAR_AUTHED_USER:
            return null;

        default:
            return state
    }
}