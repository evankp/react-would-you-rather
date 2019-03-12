export const GET_QUESTIONS = 'GET_QUESTIONS';
export const UPDATE_VOTES = 'UPDATE_VOTES';
export const REMOVE_VOTE = 'REMOVE_VOTE';

export default function questions(state = {}, action) {
    let option;

    switch (action.type) {
        case GET_QUESTIONS:
            return {
                ...state,
                ...action.questions
            };

        case UPDATE_VOTES:
            option = state[action.id][action.option];

            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    [action.option]: {
                        ...option,
                        votes: option.votes ? [...option.votes, action.user] : [action.user]
                    }
                }
            };

        case REMOVE_VOTE:
            option = state[action.id][action.option];

            if (!option.votes || option.votes.indexOf(action.user) === -1) return state;

            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    [action.option]: {
                        votes: option.votes.filter(vote => vote !== action.user)
                    }
                }
            };

        default:
            return state
    }
}