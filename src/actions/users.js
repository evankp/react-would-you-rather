import {GET_USERS} from "../reducers/users";
import {CLEAR_AUTHED_USER, SET_AUTHED_USER} from "../reducers/authedUser";

export function getUsers(users) {
    return {
        type: GET_USERS,
        users
    }
}

export function setAuthedUser(id) {
    return {
        type: SET_AUTHED_USER,
        id
    }
}

export function clearAuthedUser() {
    return {
        type: CLEAR_AUTHED_USER
    }
}