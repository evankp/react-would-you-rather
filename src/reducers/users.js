export const GET_USERS = 'GET_USERS';

export default function users(state = {}, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                ...action.users
            };

        default:
            return state
    }
}