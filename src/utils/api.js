import axios from 'axios';

const apiURL = 'https://api.evankemp.com';

//// Testing URL

// const apiURL = 'http://localhost:5000/ek-would-you-rather/us-central1/app';

/**  Gets both users and questions
 * @returns {Promise} Returns a promise with users and questions obj.
 * */
export function getInitialData() {
    return Promise.all([
        get_users(),
        getQuestions()
    ]).then(([users, questions]) => ({
        users,
        questions
    }))
}

/** Gets list of users from the database
 * @returns {Promise} Returns a promise that allows manipulation of the data returned.
 * */
export function get_users() {
    return axios.get(`${apiURL}/getUsers`)
        .then(res => res.data.success ? res.data.users : Promise.reject(res.data.message))
        .catch(err => console.log(err))
}

/** Gets list of Questions from the database
 * @returns {Promise} Returns a promise that allows manipulation of the data returned.
 * */
export function getQuestions() {
    return axios.get(`${apiURL}/getQuestions`)
        .then(res => res.data.success ? res.data.questions : Promise.reject(res.data.message))
        .catch(err => console.log(err))
}

/** Save a new question to the database
 * @param {string} author - Author of the question
 * @param {string} optionOneText - Option One
 * @param {string} optionTwoText - Option Two
 * @returns {Promise} Returns a promise with the new question formatted.
 * */
export function saveQuestion(author, optionOneText, optionTwoText) {
    return axios.post(`${apiURL}/saveQuestion`, {
        author,
        optionOneText,
        optionTwoText
    }).then(res => res.data.success ? res.data.question : Promise.reject(res.data.message))
}

/** Save an answer to the question
 * @param {object} question - Question object
 * @param {string} question.authedUser - User who answered this question
 * @param {string} question.id - The question id
 * @param {string} question.answer - The answer the user picked: "optionOne" or "OptionTwo"
 * @returns {Promise} Returns a promise with the updated question
 * */
export function answerQuestion(question) {
    return axios.post(`${apiURL}/answer`, {
        question: question
    }).then(res => res.data.success ? res.data.result : Promise.reject(res.data.message))
}