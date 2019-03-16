export const GET_USERS = 'GET_USERS';
export const UPDATE_CREATED_QUESTIONS = 'UPDATE_CREATED_QUESTIONS'

export default function users(state = {}, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                ...action.users
            };

        case UPDATE_CREATED_QUESTIONS:
            return {
                ...state,
                [action.user]: {
                    ...state[action.user],
                    questions: [...state[action.user].questions, action.questionId]
                }
            }

        default:
            return state
    }
}